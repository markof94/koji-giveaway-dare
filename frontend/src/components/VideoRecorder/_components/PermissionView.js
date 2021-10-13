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

const Title = styled.div`
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 0.35px;
  color: white;
  text-align: center;
  margin-bottom: 13px;
  color: #f5f5f7;
`;

const Label = styled.div`
  font-size: 17px;
  line-height: 21px;
  letter-spacing: -0.41px;
  text-align: center;
  margin-bottom: 25px;
  color: #757575;
`;

const Button = styled.button`
  color: #007aff;
  font-size: 17px;
  line-height: 21px;
  text-align: center;
  letter-spacing: -0.41px;
`;

/**
 * As of 11 May 2021, the Facebook and Instagram webviews on Android choose not
 * to prompt permissions for getUserMedia(), so the request will just hang and
 * eventually time out with a permission denied error. On these specific user
 * agents, the app should ask users to open in Chrome, rather than show a
 * permissions prompt.
 */
export const userAgentCanAccessCamera = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('android') && (
    ua.includes('fb_iab') ||
    ua.includes('instagram')
  )) {
    return false;
  }
  return true;
};

const PermissionView = ({ usageDescription, onPrompt }) => userAgentCanAccessCamera() ? (
  <Container>
    <Title>
      Allow Camera Access
    </Title>
    <Label>
      {usageDescription}
    </Label>
    <Button onClick={() => onPrompt()}>
      Enable Camera
    </Button>
  </Container>
) : (
  <Container>
    <Title>
      Camera Required
    </Title>
    <Label>
      You must open this page in Chrome to access the camera. Tap the menu in the top right to Open in Chrome.
    </Label>
  </Container>
);

PermissionView.propTypes = {
  usageDescription: PropTypes.string,
  onPrompt: PropTypes.func,
};

export default PermissionView;
