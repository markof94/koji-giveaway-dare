import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const RotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const DashAnimation = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  color: ${({ color }) => color || '#FFFFFF'};
  will-change: transform;

  /* filter: drop-shadow(0px 0px 4px rgba(0,0,0,0.08)); */
  svg {
    width: 100%!important;
    height: 100%!important;
    animation: ${RotateAnimation} 2s linear infinite;
    transform-origin: center;

    circle {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      stroke: currentColor;
      transform-origin: center;
      animation: ${DashAnimation} 2s ease-in-out infinite;
    }
  }

  transform: translate3d(0,0,0);
  -webkit-transform: translate3d(0,0,0);
  backface-visibility: hidden;
`;

const LoadingSpinner = ({ size, color }) => {
  let strokeWidth = 4;
  if (size > 48) {
    strokeWidth = 3;
  }

  return (
    <Container size={size || 24} color={color}>
      <svg viewBox="25 25 50 50" xmlns="http://www.w3.org/2000/svg">
        <circle
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeMiterlimit="10"
          cx="50"
          cy="50"
          r="20"
        />
      </svg>
    </Container>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default LoadingSpinner;
