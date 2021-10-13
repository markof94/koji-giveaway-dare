import React from 'react';
import styled, { css } from 'styled-components';
import Hls from 'hls.js';
import PropTypes from 'prop-types';

import CloseIcon from '@material-ui/icons/CloseOutlined';

import { thumbnailFromVideoUrl } from 'resources/helpers/thumbnailFromVideoUrl';

import LoadingSpinner from 'components/LoadingSpinner';
import ProgressBar from './_components/ProgressBar';
import PlayButton from './_components/PlayButton';
import MuteButton from './_components/MuteButton';

import {
  Wrapper,
  PlayerWrapper,
  Player,
  PlaybackOverlay,
  PlaybackIndicator,
  MuteControl,
  CloseButton,
} from '.';

const PictureInPicture = css`
  position: absolute;
  bottom: 24px;
  right: 24px;
  height: ${({ height }) => height}px;
  width: ${({ height }) => (height * 4) / 5}px;
  z-index: 3;

  opacity: 1;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  object-fit: cover;
  object-position: center;
  outline: none;
  border: none;
`;

const PictureInPicturePlayer = styled.video`
  ${PictureInPicture}
`;

const PictureInPictureLoadingShim = styled.div`
${PictureInPicture}
  z-index: 2;
  opacity: ${({ hasLoadedPlayer }) => hasLoadedPlayer ? 0 : 1};
  transition: opacity 0.3s ease;
`;

class VideoPlayer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      // isBuffering: true,
      userHasRequestedPlayback: false,
      isMuted: false,
      hasLoadedPlayer: false,
      hasLoadedPictureInPicturePlayer: false,
    };

    this.progressInterval = null;
    this.progressRef = React.createRef();

    // this.bufferingTimeout = null;

    this.playerRef = React.createRef();
    this.pictureInPicturePlayerRef = React.createRef();

    this.isPlayingMain = false;
    this.isPlayingPictureInPicture = false;
  }

  componentDidMount() {
    // Load the main video
    if (
      this.props.hlsUrl &&
      this.playerRef &&
      this.playerRef.current &&
      Hls.isSupported()
    ) {
      const hls = new Hls();
      hls.loadSource(this.props.hlsUrl);
      hls.attachMedia(this.playerRef.current);
    }

    // Load the picture in picture video
    if (
      this.props.pictureInPictureHlsUrl &&
      this.pictureInPicturePlayerRef &&
      this.pictureInPicturePlayerRef.current &&
      Hls.isSupported()
    ) {
      const hls = new Hls();
      hls.loadSource(this.props.pictureInPictureHlsUrl);
      hls.attachMedia(this.pictureInPicturePlayerRef.current);
    }

    // If there are raw URLs, explicitly load them so we get a poster image
    if (this.props.rawUrl) {
      this.playerRef.current.load();
    }
    if (this.props.pictureInPictureRawUrl) {
      this.pictureInPicturePlayerRef.current.load();
    }

    //
    // Configure the main player
    //
    this.playerRef.current.addEventListener('playing', () => {
      // if (this.state.isBuffering) {
      //   this.setState({ isBuffering: false });
      // }

      // if (this.bufferingTimeout) {
      //   clearTimeout(this.bufferingTimeout);
      //   this.bufferingTimeout = null;
      // }

      if (this.isPlayingMain) {
        return;
      }
      this.isPlayingMain = true;

      // If we're the first one to play, pause until both are ready.
      if (!this.isPlayingPictureInPicture) {
        this.playerRef.current.pause();
      } else {
        this.onVideosDidStart();
      }
    });

    this.playerRef.current.addEventListener('ended', () => {
      this.isPlayingMain = false;
      if (!this.isPlayingPictureInPicture) {
        this.onStopped();
      }
    });

    // Player is buffering
    // this.playerRef.current.addEventListener('waiting', () => {
    //   if (this.bufferingTimeout || this.state.isBuffering) {
    //     return;
    //   }
    //   this.bufferingTimeout = setTimeout(() => {
    //     this.setState({ isBuffering: true });
    //   }, 3000);
    // });

    // Player was muted/unmuted
    this.playerRef.current.addEventListener('volumechange', () => {
      this.setState({
        isMuted: this.playerRef.current.muted,
      });
    });

    // Picture in picture event listeners
    this.pictureInPicturePlayerRef.current.addEventListener('playing', () => {
      if (this.isPlayingPictureInPicture) {
        return;
      }
      this.isPlayingPictureInPicture = true;

      // If we're the first one to play, pause until both are ready.
      if (!this.isPlayingMain) {
        this.pictureInPicturePlayerRef.current.pause();
      } else {
        this.onVideosDidStart();
      }
    });
    this.pictureInPicturePlayerRef.current.addEventListener('ended', () => {
      this.isPlayingPictureInPicture = false;
      if (!this.isPlayingMain) {
        this.onStopped();
      }
    });
  }

  onVideosDidStart() {
    // Start both videos
    if (this.pictureInPicturePlayerRef.current.paused) {
      this.pictureInPicturePlayerRef.current.play()
        .catch((err) => {});
    }

    if (this.playerRef.current.paused) {
      this.playerRef.current.play()
        .catch((err) => {});
    }

    this.setState({ isPlaying: true });

    // We set an interval for playback progress update, as the actual event is
    // not always reliable
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    this.progressInterval = setInterval(() => {
      if (!this.playerRef.current) {
        clearInterval(this.progressInterval);
        return;
      }

      const {
        currentTime,
        duration,
      } = this.playerRef.current;
      const progress = (currentTime / duration);
      try {
        this.progressRef.current.style.transform = `translateX(${(1 - progress) * -100}%)`;
      } catch (err) {
        //
      }
    }, 25);
  }

  onPlay() {
    this.setState({ userHasRequestedPlayback: true }, () => {
      this.pictureInPicturePlayerRef.current.play()
        .then(() => {
          this.pictureInPicturePlayerRef.current.muted = false;
        })
        .catch((err) => {});

      this.playerRef.current.play()
        .then(() => {
          this.playerRef.current.muted = false;
        })
        .catch((err) => {});
    });
  }

  onStopped() {
    this.setState({ userHasRequestedPlayback: false, isPlaying: false }, () => {
      this.pictureInPicturePlayerRef.current.pause();
      this.pictureInPicturePlayerRef.current.currentTime = 0;
      this.pictureInPicturePlayerRef.current.muted = true;

      this.playerRef.current.pause();
      this.playerRef.current.currentTime = 0;
      this.playerRef.current.muted = true;

      this.isPlayingReaction = false;
      this.isPlayingSource = false;
    });
  }

  componentWillUnmount() {
    if (this.playerRef.current) {
      this.playerRef.current.pause();
    }

    if (this.pictureInPicturePlayerRef.current) {
      this.pictureInPicturePlayerRef.current.pause();
    }
  }

  render() {
    const {
      hlsUrl,
      rawUrl,
      pictureInPictureHlsUrl,
      pictureInPictureRawUrl,
      fullBleed,
      borderRadius,
      onDismiss,
      pictureInPictureSize,
      pictureInPictureBorderRadius,
    } = this.props;

    const {
      isMuted,
      isPlaying,
      // isBuffering,
      userHasRequestedPlayback,
      hasLoadedPlayer,
      hasLoadedPictureInPicturePlayer,
    } = this.state;

    return (
      <Wrapper
        fullBleed={fullBleed}
        noBorder
      >
        <PlayerWrapper
          hasLoadedPlayer={hasLoadedPlayer}
          onClick={(e) => {
            if (!userHasRequestedPlayback) {
              this.onPlay(e);
            }
          }}
        >
          <Player
            ref={this.playerRef}
            playsInline
            muted
            poster={thumbnailFromVideoUrl(hlsUrl)}
            onLoadedMetadata={() => setTimeout(() => this.setState({ hasLoadedPlayer: true }), 100)}
            fullBleed
            lockAspect={!!hlsUrl}
          >
            {hlsUrl && (
              <source src={hlsUrl} type="application/x-mpegURL" />
            )}
            {rawUrl && (
              <source src={rawUrl} />
            )}
          </Player>

          <PictureInPicturePlayer
            ref={this.pictureInPicturePlayerRef}
            playsInline
            muted
            poster={thumbnailFromVideoUrl(pictureInPictureHlsUrl)}
            onLoadedMetadata={() => setTimeout(() => this.setState({ hasLoadedPictureInPicturePlayer: true }), 100)}
            height={pictureInPictureSize || 180}
            borderRadius={pictureInPictureBorderRadius || 18}
          >
            {pictureInPictureHlsUrl && (
              <source src={pictureInPictureHlsUrl} type="application/x-mpegURL" />
            )}
            {pictureInPictureRawUrl && (
              <source src={pictureInPictureRawUrl} />
            )}
          </PictureInPicturePlayer>

          <PictureInPictureLoadingShim
            hasLoadedPlayer={hasLoadedPictureInPicturePlayer}
            height={pictureInPictureSize || 180}
            borderRadius={pictureInPictureBorderRadius || 18}
          />
        </PlayerWrapper>

        <ProgressBar
          fullBleed={fullBleed}
          providedPctRef={this.progressRef}
        />

        {isPlaying && (
          <MuteControl>
            <MuteButton
              isMuted={isMuted}
              onClick={(e) => {
                e.stopPropagation();
                this.playerRef.current.muted = !this.playerRef.current.muted;
                this.pictureInPicturePlayerRef.current.muted = !this.pictureInPicturePlayerRef.current.muted;
              }}
            />
          </MuteControl>
        )}

        {onDismiss && (
          <CloseButton
            onClick={() => {
              if (this.playerRef.current) {
                this.playerRef.current.pause();
              }
              onDismiss();
            }}
          >
            <CloseIcon />
          </CloseButton>
        )}

        <PlaybackOverlay isVisible={!isPlaying}>
          {userHasRequestedPlayback ? (
            <PlaybackIndicator>
              <LoadingSpinner size={32} />
            </PlaybackIndicator>
          ) : (
            <PlayButton />
          )}
        </PlaybackOverlay>

        {/* {userHasRequestedPlayback && isBuffering && (
          <PlaybackIndicator>
            <LoadingSpinner size={32} />
          </PlaybackIndicator>
        )} */}
      </Wrapper>
    );
  }
}

VideoPlayer.propTypes = {
  hlsUrl: PropTypes.string,
  rawUrl: PropTypes.string,
  pictureInPictureHlsUrl: PropTypes.string,
  pictureInPictureRawUrl: PropTypes.string,
  fullBleed: PropTypes.bool,
  borderRadius: PropTypes.number,
  onDismiss: PropTypes.func,
  pictureInPictureSize: PropTypes.number,
  pictureInPictureBorderRadius: PropTypes.number,
};

export default VideoPlayer;
