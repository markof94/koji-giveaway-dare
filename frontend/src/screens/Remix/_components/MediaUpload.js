import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Clear from 'resources/icons/Clear';
import UserMedia from './UserMedia';
import Button from './Button';
import PlayButton from '../../../components/VideoPlayer/_components/PlayButton';
import { thumbnailFromVideoUrl } from '../../../resources/util/thumbnailFromVideoUrl';

const Container = styled.div`
  position: relative;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 24px;
`;

const MediaWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 187px;
  
  div{
    border-radius: 10px;
  }

  @media(min-width: 699px){
    height: 40vh;
  }
`;

const ClearButton = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
  width: 22px;
  height: 22px;
  z-index: 3;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  svg{
    color: #000000;
    font-size: 22px;
  }
`;

const PlayButtonStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

const MediaUpload = ({
  userImage,
  userVideo,
  onSelectMedia,
  onClear,
  isInvalid,
  onSetFullscreenUrl,
}) => {
  const hasMedia = userImage !== '' || userVideo !== '';

  let src = '';
  if (hasMedia) {
    src = userImage;
    if (userImage === '') {
      src = thumbnailFromVideoUrl(userVideo);
    }
  }

  return (
    <Container>
      {
        hasMedia ? (
          <MediaWrapper
            onClick={() => userVideo !== '' ? onSetFullscreenUrl(userVideo) : onSetFullscreenUrl('')}
          >
            <UserMedia
              backgroundImage={src}
              contain={userVideo !== ''}
            />

            {
              userVideo !== '' && (
                <PlayButton
                  style={PlayButtonStyle}
                />
              )
            }

            <ClearButton
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
            >
              <Clear />
            </ClearButton>
          </MediaWrapper>
        ) : (
          <Button
            onClick={onSelectMedia}
            isInvalid={isInvalid}
          />
        )
      }
    </Container>
  );
};

MediaUpload.propTypes = {
  isInvalid: PropTypes.bool,
  onClear: PropTypes.func,
  onSelectMedia: PropTypes.func,
  onSetFullscreenUrl: PropTypes.func,
  userImage: PropTypes.string,
  userVideo: PropTypes.string,
};

export default MediaUpload;
