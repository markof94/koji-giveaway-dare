import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PostModalClose from 'resources/icons/PostModalClose';
import VideoPlayer from 'components/VideoPlayer';
import { motion } from 'framer-motion';

const closeDuration = 0.25;

const Container = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 51;
  animation: scale-in-center 0.5s cubic-bezier(.25,.46,.45,.94) both;
  background-color: #111111;

  ${(props) => props.isClosing && `
    animation: scale-out-center ${closeDuration}s cubic-bezier(0.165, 0.840, 0.440, 1.000) both, fade-out 0.5s ease both;
  `}
`;

const CloseButton = styled.div`
    position: absolute;
    left: 20px;
    top: 20px;
    z-index: 51;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
`;

const timeout = null;

const FullscreenVideoSingle = (props) => {
  const {
    src,
    onClose,
  } = props;

  const [isClosing, setIsClosing] = useState(false);

  const startClosing = () => {
    setIsClosing(() => true);
    setTimeout(() => {
      onClose();
    }, closeDuration * 1000);
  };

  useEffect(() => (() => {
    clearTimeout(timeout);
  }), []);

  return (
    <Container
      isClosing={isClosing}
      key="fullscreen-video"
      initial={{ opacity: 0, transform: 'scale(0, 0)' }}
      animate={{
        opacity: 1, transform: 'scale(1, 1)', transition: { duration: 0.3 },
      }}
      exit={{ opacity: 0, transform: 'scale(0, 0)', transition: { duration: 0.3 } }}
    >
      <VideoPlayer
        hlsUrl={src}
        autoPlay
        onPlaybackCompleted={startClosing}
      />

      <CloseButton
        onClick={(e) => {
          e.stopPropagation();
          startClosing();
        }}
      >
        <PostModalClose />
      </CloseButton>
    </Container>
  );
};

FullscreenVideoSingle.propTypes = {
  src: PropTypes.string,
  onClose: PropTypes.func,
};

export default FullscreenVideoSingle;
