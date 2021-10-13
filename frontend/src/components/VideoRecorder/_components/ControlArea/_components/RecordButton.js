import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

import Tooltip from 'components/Tooltip';

const Container = styled.button`
  position: absolute;
  z-index: 9;
  left: calc((100% - 70px) / 2);
  top: calc((100% - 70px) / 2);
  width: 70px;
  height: 70px;

  border-radius: 50%;
  border: 4px solid white;

  padding: 2px;
`;

const Button = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #f44336;
  margin: auto;
`;

const RecordButton = ({ isRecording, maxDuration, onClick }) => (
  <Container onClick={() => onClick()}>
    <Button
      initial={false}
      animate={(isRecording) ? ({
        borderRadius: '6px',
        width: '24px',
        height: '24px',
      }) : ({
        borderRadius: '50%',
        width: '100%',
        height: '100%',
      })}
      transition={{
        duration: 0.4,
        ease: 'circOut',
      }}
    />
    <AnimatePresence>
      {!isRecording && (
        <Tooltip
          label={maxDuration ? (
            'Tap here to start recording your response. You\'ll have up to 30 sec.'
          ) : (
            'Tap here to start recording'
          )}
          left={0}
        />
      )}
    </AnimatePresence>
  </Container>
);

RecordButton.propTypes = {
  isRecording: PropTypes.bool,
  maxDuration: PropTypes.number,
  onClick: PropTypes.func,
};

export default RecordButton;
