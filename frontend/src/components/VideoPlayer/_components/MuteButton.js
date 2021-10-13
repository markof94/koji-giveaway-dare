import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MuteIcon from '@material-ui/icons/VolumeUpOutlined';
import UnmuteIcon from '@material-ui/icons/VolumeOffOutlined';

const Button = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    background: rgba(40, 40, 40, 0.4);
    color: white;
    backdrop-filter: blur(48px);
    border-radius: 50%;
    padding: 6px;

    pointer-events: none;
    width: 36px;
    height: 36px;
    color: #ffffff;
  }
`;

const MuteButton = ({ isMuted, onClick }) => (
  <Button onClick={(e) => onClick ? onClick(e) : {}}>
    {isMuted ? (
      <UnmuteIcon />
    ) : (
      <MuteIcon />
    )}
  </Button>
);

MuteButton.propTypes = {
  isMuted: PropTypes.bool,
  onClick: PropTypes.func,
};

export default MuteButton;
