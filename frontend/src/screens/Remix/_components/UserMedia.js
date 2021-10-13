import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import optimizeImage from 'resources/util/optimizeImage';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  flex: auto;
  background-color: black;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  ${(props) => props.contain && `
    background-size: contain;
  `}
`;

const Component = ({
  backgroundImage,
  contain,
}) => (
  <Container
    src={optimizeImage(backgroundImage, window.innerHeight * 1.5, window.innerHeight * 1.5)}
    contain={contain}
  >

  </Container>
);

Component.propTypes = {
  backgroundImage: PropTypes.string,
  contain: PropTypes.bool,
};

export default Component;
