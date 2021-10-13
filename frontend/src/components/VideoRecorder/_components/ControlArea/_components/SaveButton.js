import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import SendIcon from '@material-ui/icons/Send';

import LoadingSpinner from 'components/LoadingSpinner';

const Container = styled(motion.button)`
  position: absolute;
  left: calc((100% - 70px) / 2);
  top: calc((100% - 70px) / 2);
  width: 70px;
  height: 70px;

  border-radius: 50%;
`;

const Button = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: white;
  color: ${({ theme }) => theme.colors['button.background']};
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 26px;
    height: 26px;
    margin-left: ${({ isSaving }) => isSaving ? '0px' : '5px'};
  }
`;

const SendButton = ({ isSaving, onClick }) => (
  <Container
    onClick={() => isSaving ? {} : onClick()}
    whileTap={{ scale: 0.9 }}
  >
    <Button isSaving={isSaving}>
      {isSaving ? (
        <LoadingSpinner size={26} color="primary" />
      ) : (
        <SendIcon />
      )}
    </Button>
  </Container>
);

SendButton.propTypes = {
  onClick: PropTypes.func,
  isSaving: PropTypes.bool,
};

export default SendButton;
