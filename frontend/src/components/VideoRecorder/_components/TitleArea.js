import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import CloseIcon from '@material-ui/icons/ArrowBackOutlined';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${({ height }) => height}px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 9999;
  user-select: none;

  background-color: ${({ hasRecorded }) => hasRecorded ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.5)'};
  transition: background-color 0.3s ease;

  display: flex;
  padding-top: auto;
`;

const ContentArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: auto;
  margin-bottom: 12px;

  position: relative;

  color: white;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: -0.24px;
`;

const CloseButton = styled.button`
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  width: 48px;
  height: 100%;
  color: white;

  display: flex;
  align-items: center;
  padding-left: 10px;

  svg {
    width: 30px;
    height: 30px;
  }
`;

const TitleArea = ({
  title,
  isRecording,
  onBack,
  hasRecorded,
}) => (
  <Container
    height={89}
    hasRecorded={hasRecorded}
  >
    <ContentArea>
      {!isRecording && (
        <CloseButton onClick={() => onBack()}>
          <CloseIcon />
        </CloseButton>
      )}
      <span>{title}</span>
    </ContentArea>
  </Container>
);

TitleArea.propTypes = {
  title: PropTypes.string,
  isRecording: PropTypes.bool,
  onBack: PropTypes.func,
  hasRecorded: PropTypes.bool,
};

export default TitleArea;
