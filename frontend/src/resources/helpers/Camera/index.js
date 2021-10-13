export class Camera {
  constructor() {
    this.recorder = null;
    this.stream = null;
    this.buffer = [];
    this.recordingCallback = null;
    this.url = null;

    // Public
    this.mimeType = '';
  }

  async startCamera() {
    if (this.stream) {
      console.log('Camera already running');
      return null;
    }

    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      // audio: false,
      video: {
        facingMode: 'user',
        width: {
          ideal: 1280,
        },
        height: {
          ideal: 720,
        },
      },
    });

    return this.stream;
  }

  async record() {
    if (this.recorder) {
      console.log('Recorder already running');
      return;
    }

    this.buffer = [];

    // Create and configure the recorder
    this.recorder = new MediaRecorder(this.stream);

    this.recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        this.buffer.push(e.data);
      }
    };
    this.recorder.onstop = () => this.onStopped();

    // Start recording
    this.recorder.start();
  }

  async stop() {
    if (!this.recorder) {
      console.log('Not running');
      return null;
    }

    const result = await new Promise((resolve, reject) => {
      this.recordingCallback = (blob, url) => resolve({ blob, url });
      this.recorder.stop();
    });

    return result;
  }

  destroy() {
    this.recorder = null;

    if (this.stream) {
      try {
        this.stream.getTracks().forEach((track) => {
          if (track.readyState === 'live') {
            track.stop();
          }
        });
      } catch (err) {
        //
      }

      // this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }

    if (this.url) {
      URL.revokeObjectURL(this.url);
      this.url = null;
    }

    this.buffer = [];
  }

  // Private
  onStopped() {
    // Stopping the streams seems to cause a big memory leak in mobile safari,
    // so we just save it for the unmount
    //
    // try {
    //   this.stream.getTracks().forEach((track) => track.stop());
    //   this.stream = null;
    // } catch (err) {
    //   //
    // }

    // Stop recorder
    const { mimeType } = this.recorder;
    this.recorder = null;

    // Get the blob
    const blob = new Blob(this.buffer, { type: mimeType });
    // const blob = new Blob();
    this.url = URL.createObjectURL(blob);

    // Return the result
    if (this.recordingCallback) {
      this.recordingCallback(blob, this.url);
      this.recordingCallback = null;
    }
  }
}
