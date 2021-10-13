import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  position: absolute;
  z-index: 9;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 2;
`;

const Track = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  width: calc(100% - 24px);
  height: 3px;
  border-radius: 50px;
  background: rgba(0,0,0,0);
  overflow: hidden;
  mask-image: -webkit-radial-gradient(white, black);

  ${({ fullBleed }) => fullBleed && `
    width: 100%;
    top: 0;
    left: 0;
    border-radius: 0;
  `}
`;

const Inner = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 3px;
  background: white;
  border-radius: 50px;
  overflow: hidden;

  transform: translateX(-100%);
  transition: transform 0.1s linear;

  ${({ fullBleed }) => fullBleed && 'border-radius: 0;'}
`;

const ProgressBar = ({ providedPctRef, fullBleed }) => (
  <Container>
    <Track fullBleed={fullBleed}>
      <Inner fullBleed={fullBleed} ref={providedPctRef} />
    </Track>
  </Container>
);

ProgressBar.propTypes = {
  providedPctRef: PropTypes.any,
  fullBleed: PropTypes.bool,
};

export default ProgressBar;
