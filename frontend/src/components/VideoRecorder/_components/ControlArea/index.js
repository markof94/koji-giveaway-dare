import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import RecordButton from './_components/RecordButton';
import ProgressBar from './_components/ProgressBar';
import PostButton from './_components/PostButton';
import RetakeButton from './_components/RetakeButton';
import UploadButton from './_components/UploadButton';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: ${({ height }) => height}px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  z-index: 9999;
  user-select: none;

  color: white;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: -0.24px;

  opacity: ${({ isVisible }) => isVisible ? 1 : 0};
  background-color: ${({ hasRecorded }) => hasRecorded ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.5)'};
  transition: background-color 0.3s ease,
    opacity 0.2s ease-in-out;
`;

const ControlArea = ({
  allowUpload,
  hasLoadedCamera,
  isRecording,
  isSaving,
  hasRecorded,
  maxDuration,
  onStartRecording,
  onStopRecording,
  onUploadVideo,
  onRetake,
  onUpload,
}) => (
  <Container
    height={89}
    isVisible={hasLoadedCamera}
    hasRecorded={hasRecorded}
  >
    {hasRecorded ? (
      <>
        <RetakeButton
          onClick={() => onRetake()}
        />
        <PostButton
          isSaving={isSaving}
          onClick={() => onUploadVideo()}
        />
      </>
    ) : (
      <>
        <RecordButton
          isRecording={isRecording}
          maxDuration={maxDuration}
          onClick={() => {
            if (isRecording) {
              onStopRecording();
            } else {
              onStartRecording();
            }
          }}
        />

        {allowUpload && (
          <UploadButton onUpload={(url) => onUpload(url)} />
        )}

        {isRecording && (
          <ProgressBar maxDuration={maxDuration} />
        )}
      </>
    )}
  </Container>
);

ControlArea.propTypes = {
  allowUpload: PropTypes.bool,
  hasLoadedCamera: PropTypes.bool,
  isRecording: PropTypes.bool,
  isSaving: PropTypes.bool,
  hasRecorded: PropTypes.bool,
  maxDuration: PropTypes.number,
  onStartRecording: PropTypes.func,
  onStopRecording: PropTypes.func,
  onUploadVideo: PropTypes.func,
  onRetake: PropTypes.func,
  onUpload: PropTypes.func,
};

export default ControlArea;
