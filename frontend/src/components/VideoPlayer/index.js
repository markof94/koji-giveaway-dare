import React from 'react';
import styled from 'styled-components';
import Hls from 'hls.js';
import PropTypes from 'prop-types';

import CloseIcon from '@material-ui/icons/CloseOutlined';

import LoadingSpinner from '../LoadingSpinner';
import ProgressBar from './_components/ProgressBar';
import PlayButton from './_components/PlayButton';
import MuteButton from './_components/MuteButton';
import { thumbnailFromVideoUrl } from '../../resources/util/thumbnailFromVideoUrl';

export const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  border-radius: ${({ borderRadius }) => borderRadius || 0}px;
  overflow: hidden;
  mask-image: -webkit-radial-gradient(white, black);

  &:after {
    pointer-events: none;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: ${({ borderRadius }) => borderRadius || 0}px;
    border: 1px solid rgba(255,255,255,0.0975);

    ${({ noBorder }) => noBorder && `
      opacity: 0;
    `}
  }
`;

export const PlayerWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  opacity: ${({ hasLoadedPlayer }) => hasLoadedPlayer ? 1 : 0};
  transition: opacity 0.3s ease;
`;

export const Player = styled.video`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  object-fit: ${({ lockAspect }) => lockAspect ? 'contain' : 'cover'};
  object-position: center;
  outline: none;
  border: none;

  ${({ isMirrored }) => isMirrored && 'transform: scaleX(-1);'}
`;

export const PlaybackOverlay = styled.div`
  pointer-events: none;
  user-select: none;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  opacity: ${({ isVisible }) => isVisible ? 1 : 0};
`;

export const PlaybackIndicator = styled.div`
  pointer-events: none;
  z-index: 2;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayControl = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  color: transparent;
  user-select: none;
`;

export const MuteControl = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 4;
`;

export const CloseButton = styled.div`
  position: absolute;
  z-index: 999;
  top: 12px;
  left: 0;
  width: 48px;
  height: 48px;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 28px;
    height: 28px;
    filter: drop-shadow(0px 0px 2px rgba(0,0,0,0.5));
  }
`;

class VideoPlayer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      isBuffering: true,
      userHasRequestedPlayback: false,
      isMuted: false,
      hasLoadedPlayer: false,
    };

    if (props.autoPlay) {
      this.state.userHasRequestedPlayback = true;
      this.state.isMuted = true;
    }

    this.progressInterval = null;
    this.progressRef = React.createRef();

    this.bufferingTimeout = null;

    this.playerRef = props.providedRef || React.createRef();
  }

  componentDidMount() {
    if (
      this.props.hlsUrl &&
      this.props.fragmentedRole !== 'control' &&
      this.playerRef &&
      this.playerRef.current &&
      Hls.isSupported()
    ) {
      const hls = new Hls();
      hls.loadSource(this.props.hlsUrl);
      hls.attachMedia(this.playerRef.current);
    }

    // If there is a raw URL, explicitly load is so we get a poster image
    if (this.props.rawUrl) {
      this.playerRef.current.load();
    }

    // If we're just rendering the player with detached controls, the controls
    // will be responsible for registering event listeners
    if (!this.playerRef.current || this.props.fragmentedRole === 'player') {
      return;
    }

    this.playerRef.current.load();

    // Playback began
    this.playerRef.current.addEventListener('playing', () => {
      if (this.state.isBuffering) {
        this.setState({ isBuffering: false });
      }

      if (this.bufferingTimeout) {
        clearTimeout(this.bufferingTimeout);
        this.bufferingTimeout = null;
      }

      if (this.state.isPlaying) {
        return;
      }

      this.onDidStart();
    });

    // Playback ended
    this.playerRef.current.addEventListener('ended', () => {
      clearInterval(this.progressInterval);
      this.progressInterval = null;

      if (this.props.onPlaybackCompleted) {
        this.props.onPlaybackCompleted();
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

    // Player was paused
    this.playerRef.current.addEventListener('pause', () => {
      if (this.props.isControlled) {
        return;
      }

      this.setState({
        isPlaying: false,
        userHasRequestedPlayback: false,
      });
    });

    // Player was muted/unmuted
    this.playerRef.current.addEventListener('volumechange', () => {
      this.setState({
        isMuted: this.playerRef.current.muted,
      });
    });

    this.playerRef.current.addEventListener('error', (err) => console.log(err));

    // If autoplay, attempt to start playback
    if (this.props.autoPlay) {
      this.playerRef.current.play()
        .catch((err) => { });
    }
  }

  onPlay(e) {
    if (this.state.isPlaying || !this.playerRef.current) {
      return;
    }

    this.playerRef.current.play()
      .then(() => {
        if (!this.state.isMuted) {
          this.playerRef.current.muted = false;
          this.playerRef.current.volume = 1;
        }
      })
      .catch((err) => { });

    this.setState({ userHasRequestedPlayback: true });
  }

  onDidStart() {
    this.setState({ isPlaying: true }, () => {
      if (this.props.onPlaybackStarted) {
        this.props.onPlaybackStarted();
      }
    });

    // We set an interval for playback progress update, as the actual event is
    // not always reliable
    if (this.props.fragmentedRole === 'controls') {
      return;
    }

    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
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
        this.progressRef.current.style.transform = `translateX(${(1 - progress) * -100}%) translateZ(0)`;
      } catch (err) {
        //
      }
    }, 25);
  }

  componentWillUnmount() {
    if (this.playerRef.current) {
      this.playerRef.current.pause();
    }
  }

  render() {
    const {
      hlsUrl,
      rawUrl,
      autoPlay,
      loop,
      fragmentedRole,
      borderRadius,
      onDismiss,
      isControlled,
      fullBleed,
      isMirrored,
      lockAspect,
    } = this.props;

    const {
      isMuted,
      isPlaying,
      isBuffering,
      userHasRequestedPlayback,
      hasLoadedPlayer,
    } = this.state;

    const playerProps = {
      playsInline: true,
      poster: thumbnailFromVideoUrl(hlsUrl),
      isMirrored,
    };

    if (loop) {
      playerProps.loop = true;
    }

    if (autoPlay) {
      playerProps.autoPlay = true;
      playerProps.muted = true;
    }

    if (lockAspect) {
      playerProps.lockAspect = true;
    }

    const player = (
      <PlayerWrapper
        hasLoadedPlayer={hasLoadedPlayer}
        noBorder
      >
        <Player
          ref={this.playerRef}
          {...playerProps}
          onLoadedMetadata={() => setTimeout(() => {
            this.setState({ hasLoadedPlayer: true });
          }, 100)}
        >
          {hlsUrl && (
            <source src={hlsUrl} type="application/x-mpegURL" />
          )}
          {rawUrl && (
            <source src={rawUrl} />
          )}
        </Player>
        {!fragmentedRole && (
          <ProgressBar
            fullBleed={fullBleed}
            providedPctRef={this.progressRef}
          />
        )}
      </PlayerWrapper>
    );

    const controls = (
      <PlayerWrapper
        hasLoadedPlayer={fragmentedRole === 'controls' || hasLoadedPlayer}
        noBorder
      >
        <PlayControl
          onClick={(e) => {
            if (!userHasRequestedPlayback) {
              this.onPlay(e);
            } else if (!isControlled) {
              this.playerRef.current.pause();
            }
          }}
        />

        {isPlaying && (
          <MuteControl>
            <MuteButton
              isMuted={isMuted}
              onClick={(e) => {
                e.stopPropagation();
                this.playerRef.current.muted = !this.playerRef.current.muted;
              }}
            />
          </MuteControl>
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

        {userHasRequestedPlayback && isBuffering && (
          <PlaybackIndicator>
            <LoadingSpinner size={32} />
          </PlaybackIndicator>
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
      </PlayerWrapper>
    );

    // We need to support breaking apart the player and control layer to account
    // for cases like the landing page, where the player is behind a scrolling
    // element (with padding), but the controls still need to be clickable
    if (fragmentedRole === 'player') {
      return (
        <Wrapper
          noBorder
          borderRadius={borderRadius}
        >
          {player}
        </Wrapper>
      );
    }

    if (fragmentedRole === 'controls') {
      return (
        <Wrapper
          noBorder
          borderRadius={borderRadius}
        >
          {controls}
        </Wrapper>
      );
    }

    return (
      <Wrapper
        noBorder={lockAspect}
        borderRadius={borderRadius}
      >
        {player}
        {controls}
      </Wrapper>
    );
  }
}

VideoPlayer.propTypes = {
  hlsUrl: PropTypes.string,
  rawUrl: PropTypes.string,
  fullBleed: PropTypes.bool,
  borderRadius: PropTypes.number,
  providedRef: PropTypes.any,
  autoPlay: PropTypes.bool,
  loop: PropTypes.bool,
  fragmentedRole: PropTypes.string,
  onDismiss: PropTypes.func,

  isMirrored: PropTypes.bool,
  lockAspect: PropTypes.bool,
  isControlled: PropTypes.bool,
  onPlaybackStarted: PropTypes.func,
  onPlaybackCompleted: PropTypes.func,
};

export default VideoPlayer;
