import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99;
  padding: 32px;
`;

const Label = styled.div`
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 0.35px;
  color: white;
  text-align: center;
  margin-bottom: 13px;
  color: #f5f5f7;
`;

const Subtitle = styled.div`
  font-size: 17px;
  line-height: 21px;
  letter-spacing: -0.41px;
  text-align: center;
  margin-bottom: 25px;
  color: #757575;
`;

const ErrorView = () => (
  <Container>
    <Label>Error Loading Camera</Label>
    <Subtitle>Please reload the page and try again.</Subtitle>
  </Container>
);

ErrorView.propTypes = {
  //
};

export default ErrorView;
