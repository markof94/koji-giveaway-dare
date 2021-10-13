import React from 'react';
import styled from 'styled-components';
import * as uuid from 'uuid';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Koji from '@withkoji/core';

import { Camera } from 'resources/helpers/Camera';
import CameraPlayer from 'resources/helpers/Camera/CameraPlayer';
import VideoPlayer from 'components/VideoPlayer';

import LoadingSpinner from 'components/LoadingSpinner';

import PermissionView from './_components/PermissionView';
import ErrorView from './_components/ErrorView';
import TitleArea from './_components/TitleArea';
import ControlArea from './_components/ControlArea';

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  overflow: hidden;
  width: 100%;
  background: black;
  z-index: 10;
`;

const LoadingArea = styled.div`
  pointer-events: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  color: transparent;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewArea = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
`;

class VideoRecorder extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sessionKey: uuid.v4(),
      isLoadingPermissions: false,
      error: null,
      isRecording: false,
      isSaving: false,
      previewUrl: null,
      previewSource: null,
      guideHeight: 0,
      isFirstRecord: true,
    };

    this.fileUpload = null;
    this.playbackBuffer = null;
    this.recordingStartTime = null;
    this.recordingTimeout = null;

    this.cameraPlayerRef = React.createRef();
    this.previewPlayerRef = React.createRef();

    this.maxDuration = props.maxDuration;
    this.dateRecordingStarted = null;

    this.camera = new Camera();
  }

  reset() {
    this.setState({
      sessionKey: uuid.v4(),
      isRecording: false,
      previewUrl: null,
    }, () => {
      this.camera.destroy();
      this.playbackBuffer = null;
      this.fileUpload = null;

      this.camera = new Camera();
      this.loadCamera();
    });
  }

  async loadCamera() {
    try {
      this.setState({
        isLoadingPermissions: true,
      });

      const stream = await this.camera.startCamera();
      this.cameraPlayerRef.current.srcObject = stream;

      this.setState({
        hasPermission: true,
        isLoadingPermissions: false,
      });
    } catch (err) {
      this.setState({
        error: err,
        isLoadingPermissions: false,
      });
    }
  }

  async onStartRecording() {
    try {
      this.setState({
        isRecording: true,
        isFirstRecord: false,
      });

      // Start recording and start a timer for the max duration, so we can
      // programmatically stop recording when the duration is reached
      await this.camera.record();

      if (this.maxDuration) {
        this.dateRecordingStarted = Date.now();
        this.recordingTimeout = setTimeout(() => {
          if (this.state.isRecording) {
            this.stopRecording();
          }
        }, this.maxDuration * 1e3);
      }
    } catch (err) {
      console.log(err);
      this.setState({ error: err });
    }
  }

  async stopRecording() {
    if (this.recordingTimeout) {
      clearTimeout(this.recordingTimeout);
      this.recordingTimeout = null;
    }

    this.setState({
      isRecording: false,
    });

    const {
      url,
      blob,
    } = await this.camera.stop();

    this.playbackBuffer = blob;
    this.setState({
      previewUrl: url,
      previewSource: 'capture',
    });
  }

  async saveFileUpload(file) {
    const url = URL.createObjectURL(file);

    // Convert the file into a blob to reconstruct later, otherwise browser
    // security restrictions will prevent us from passing the File to the Koji
    // platform
    const res = await fetch(url);
    this.playbackBuffer = await res.blob();
    this.setState({
      previewUrl: url,
      previewSource: 'upload',
    });
  }

  async onUploadVideo() {
    this.setState({ isSaving: true });

    this.previewPlayerRef.current.pause();

    const file = new File(
      [this.playbackBuffer],
      'request.video',
      { type: this.playbackBuffer.type },
    );

    const url = await Koji.ui.upload.uploadFile({
      file,
      type: 'video',
      videoOptions: {
        hls: true,
        remux: true,
        remuxPreset: {
          aspectRatio: '4:5',
          sizePolicy: 'fill',
        },
      },
    });

    this.props.onUpload(url);
    this.setState({ isSaving: false });
    this.camera.destroy();
  }

  componentWillUnmount() {
    this.camera.destroy();
  }

  goBackToView = () => {
    this.camera.destroy();
    this.props.onBack();
  }

  render() {
    const {
      title,
      permissionLabel,
      allowUpload,
      showSendLabel,
      showTips,
    } = this.props;

    const {
      sessionKey,
      hasPermission,
      isLoadingPermissions,
      error,
      isRecording,
      previewUrl,
      previewSource,
      hasLoadedCamera,
      guideHeight,
      isSaving,
      isFirstRecord,
    } = this.state;

    return (
      <Wrapper
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
        key="recorder1"
      >
        <TitleArea
          title={title}
          isRecording={isRecording}
          hasRecorded={!!previewUrl}
          height={guideHeight}
          onBack={this.goBackToView}
        />

        {!hasPermission && !isLoadingPermissions && (
          <PermissionView
            usageDescription={permissionLabel}
            onPrompt={() => this.loadCamera()}
          />
        )}

        {hasPermission && !hasLoadedCamera && (
          <LoadingArea>
            <LoadingSpinner />
          </LoadingArea>
        )}

        {error && (
          <ErrorView />
        )}

        <CameraPlayer
          key={`CameraPreview_${sessionKey}`}
          cameraRef={this.cameraPlayerRef}
          onDidLoad={() => this.setState({ hasLoadedCamera: true })}
          onSetGuideHeight={(height) => this.setState({ guideHeight: height })}
          hideGuides
        />

        <ControlArea
          allowUpload={allowUpload}
          hasLoadedCamera={hasLoadedCamera}
          isRecording={isRecording}
          isSaving={isSaving}
          hasRecorded={!!previewUrl}
          maxDuration={this.maxDuration}
          height={guideHeight}
          onStartRecording={() => this.onStartRecording()}
          onStopRecording={() => this.stopRecording()}
          onUploadVideo={() => this.onUploadVideo()}
          onRetake={() => this.reset()}
          showSendLabel={showSendLabel}
          showTips={showTips}
          showsTipsAutomatically={isFirstRecord}
          onUpload={(url) => this.saveFileUpload(url)}
        />

        {previewUrl && (
          <PreviewArea>
            <VideoPlayer
              key={`PlaybackView_${sessionKey}`}
              providedRef={this.previewPlayerRef}
              rawUrl={previewUrl}
              isMirrored={previewSource === 'capture'}
            />
          </PreviewArea>
        )}
      </Wrapper>
    );
  }
}

VideoRecorder.propTypes = {
  maxDuration: PropTypes.number,
  title: PropTypes.string,
  permissionLabel: PropTypes.string,
  allowUpload: PropTypes.bool,
  showSendLabel: PropTypes.bool,
  showTips: PropTypes.bool,
  onBack: PropTypes.func,
  onUpload: PropTypes.func,
};

export default VideoRecorder;
