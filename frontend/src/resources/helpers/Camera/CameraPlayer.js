import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  opacity: ${({ isVisible }) => isVisible ? 1 : 0};
  transition: opacity 0.2s ease;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
`;

const VideoPlayer = styled.video`
  pointer-events: none;
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;

  outline: none;
  border: none;

  overflow: hidden;
  background: #111111;

  transform: scaleX(-1);
`;

const CropGuide = styled.div`
  width: 100%;
  height: ${({ height }) => height}px;
  position: absolute;
  background: rgba(0,0,0,0.5);
  left: 0;
  z-index: 9;
  pointer-events: none;
  ${({ position }) => position === 'top' ? 'top: 0;' : 'bottom: 0;'}
  z-index: 9;
`;

class CameraPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasLoaded: false,
      guideHeight: 0,
    };

    this.containerRef = React.createRef();
    this.playerRef = props.cameraRef;
  }

  componentDidMount() {
    // Setup top and bottom guides to lock to a 4:5 aspect ratio
    const { width, height } = this.containerRef.current.getBoundingClientRect();
    const safeHeight = (width * 5) / 4;
    const guideHeight = (height - safeHeight) / 2;

    this.setState({
      guideHeight,
    });
    if (this.props.onSetGuideHeight) {
      this.props.onSetGuideHeight(guideHeight);
    }
  }

  onDidLoad() {
    setTimeout(() => {
      this.props.onDidLoad();
      this.setState({ hasLoaded: true });
    }, 1000);
  }

  render() {
    const {
      hasLoaded,
      guideHeight,
    } = this.state;
    const { hideGuides } = this.props;

    const isDesktop = window.innerWidth >= 700;

    return (
      <Container
        isVisible={hasLoaded}
        ref={this.containerRef}
      >
        <VideoPlayer
          ref={this.playerRef}
          isDesktop={isDesktop}
          playsInline
          muted
          autoPlay
          onLoadedMetadata={() => this.onDidLoad()}
        />
        {!hideGuides && (
          <>
            <CropGuide height={guideHeight} position="top" />
            <CropGuide height={guideHeight} position="bottom" />
          </>
        )}
      </Container>
    );
  }
}

CameraPlayer.propTypes = {
  cameraRef: PropTypes.any,
  onDidLoad: PropTypes.func,
  onSetGuideHeight: PropTypes.func,
  hideGuides: PropTypes.bool,
};

export default CameraPlayer;
