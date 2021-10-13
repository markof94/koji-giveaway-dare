import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PlayIcon from '@material-ui/icons/PlayArrow';

const Button = styled.div`
  position: absolute;

  svg {
    background: rgba(40, 40, 40, 0.4);
    color: white;
    backdrop-filter: blur(48px);
    border-radius: 50%;
    padding: 10px;

    pointer-events: none;
    width: 64px;
    height: 64px;
    color: #ffffff;
  }
`;

const PlayButton = ({ onClick, style }) => (
  <Button
    onClick={() => onClick ? onClick() : {}}
    style={style}
  >
    <PlayIcon />
  </Button>
);

PlayButton.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default PlayButton;
