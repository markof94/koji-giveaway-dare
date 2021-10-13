import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Koji from '@withkoji/core';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import Close from '../../../resources/icons/Close';
import VideoPlayer from '../../../components/VideoPlayer';
import { setFullscreenVideoUrl } from '../../../store/actions';
import { makeSelectFullscreenVideoUrl } from '../../../store/selectors';

const closeDuration = 0.25;

const Container = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;
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

const FullscreenVideo = (props) => {
  const dispatch = useDispatch();
  const onClose = () => dispatch(setFullscreenVideoUrl(''));
  const src = useSelector(makeSelectFullscreenVideoUrl());

  return (
    <Container
      initial={{ opacity: 0, scale: '0.75, 0.75' }}
      animate={{ opacity: 1, scale: '1, 1' }}
      exit={{ opacity: 0, scale: '0.75, 0.75' }}
      transition={{ ease: 'circOut', duration: 0.3 }}
      key="fullVideo"
    >
      <VideoPlayer
        hlsUrl={src}
        autoPlay
      />

      <CloseButton onClick={onClose}>
        <Close />
      </CloseButton>
    </Container>
  );
};

FullscreenVideo.propTypes = {};

export default FullscreenVideo;
