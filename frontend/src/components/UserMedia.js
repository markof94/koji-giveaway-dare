import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import optimizeImage from 'resources/util/optimizeImage';
import VideoPlayer from 'components/VideoPlayer';
import isMediaVideo from 'resources/util/isMediaVideo';
import { thumbnailFromVideoUrl } from 'resources/util/thumbnailFromVideoUrl';

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
  background-color: ${(props) => props.bgColor || '#111111'};
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  ${(props) => props.contain && `
    background-size: contain;
  `}
`;

const UserMedia = (props) => {
  const {
    media,
    backgroundColor,
    onVideoStart,
    onVideoEnd,
  } = props;

  const isVideo = isMediaVideo(media);
  const backgroundSrc = isVideo ? thumbnailFromVideoUrl(media, window.innerHeight * 1.5) : optimizeImage(media, window.innerHeight * 1.5, window.innerHeight * 1.5);

  return (
    <Container
      src={backgroundSrc}
      bgColor={backgroundColor}
      contain={isVideo}
    >

      {
        isVideo && (
          <VideoPlayer
            hlsUrl={media}
            rawUrl={media}
            lockAspect
            onPlaybackCompleted={onVideoEnd}
            onPlaybackStarted={onVideoStart}
            showPoster
          />
        )
      }
    </Container>
  );
};

UserMedia.propTypes = {
  media: PropTypes.string,
  backgroundColor: PropTypes.string,
  onVideoStart: PropTypes.func,
  onVideoEnd: PropTypes.func,
};

export default UserMedia;
