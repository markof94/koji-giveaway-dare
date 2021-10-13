import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';

import { thumbnailFromVideoUrl } from 'resources/helpers/thumbnailFromVideoUrl';
import PlayButton from 'components/VideoPlayer/_components/PlayButton';

const LoadingAnimation = keyframes`
  0% {
    background-color: #f4f4f4;
  }
  50% {
    background-color: #e1e1e1;
  }
  100% {
    background-color: #f4f4f4;
  }
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  background-image: url(${({ image }) => image});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${({ borderRadius }) => borderRadius}px;

    opacity: ${({ hasLoaded }) => hasLoaded ? 1 : 0};
    transition: opacity 0.3s ease;
  }

  ${({ hasLoaded }) => !hasLoaded && css`
    animation: ${LoadingAnimation} 1.5s ease infinite;
  `}

  ${({ isEmpty }) => isEmpty && css`
    background-color: #f4f4f4;
  `}

  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: ${({ borderRadius }) => borderRadius}px;
    border: 1px solid rgba(0,0,0,0.0975);
    z-index: 9;

    ${({ noStroke }) => noStroke && `
      opacity: 0;
    `}
  }
`;

const PlayButtonWrapper = styled.div`
  position: absolute;
  top: calc((100% - 30px) / 2);
  left: calc((100% - 30px) / 2);

  svg {
    width: 30px;
    height: 30px;
    padding: 6px;
  }
`;

class VideoThumbnail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
    };
  }

  render() {
    const {
      videoUrl,
      borderRadius,
      noStroke,
      showsPlayButton,
    } = this.props;

    const { hasLoaded } = this.state;

    const src = videoUrl ? thumbnailFromVideoUrl(videoUrl, 700) : null;
    return (
      <Wrapper
        isEmpty={!src}
        borderRadius={borderRadius}
        hasLoaded={hasLoaded}
        noStroke={noStroke}
        image={src}
      >
        {showsPlayButton && (
          <PlayButtonWrapper>
            <PlayButton />
          </PlayButtonWrapper>
        )}
      </Wrapper>
    );
  }
}

VideoThumbnail.propTypes = {
  videoUrl: PropTypes.string,
  borderRadius: PropTypes.number,
  noStroke: PropTypes.bool,
  showsPlayButton: PropTypes.bool,
};

export default VideoThumbnail;
