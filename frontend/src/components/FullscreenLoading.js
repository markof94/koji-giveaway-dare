import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import LoadingSpinner from './LoadingSpinner';

const Container = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  ${(props) => props.opacity && `
    background: rgba(0, 0, 0, ${props.opacity});
  `}
`;

const Label = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 31px;
  color: white;
`;

const FullscreenLoading = (props) => {
  const {
    opacity = 0.75,
    label = '',
  } = props;

  return (
    <Container
      opacity={opacity}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {
        label !== '' ? (
          <Label>
            {label}
          </Label>
        )
          :
          <LoadingSpinner />
      }
    </Container>
  );
};

FullscreenLoading.propTypes = {
  opacity: PropTypes.bool,
  label: PropTypes.string,
};

export default FullscreenLoading;
