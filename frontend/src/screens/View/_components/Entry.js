import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Koji from '@withkoji/core';
import { useDispatch, useSelector } from 'react-redux';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { makeSelectPresumedRole } from 'store/selectors';
import { cursorPointer, flexCenter } from '../../../resources/util/styles';
import { thumbnailFromVideoUrl } from '../../../resources/util/thumbnailFromVideoUrl';
import PlayButton from '../../../components/VideoPlayer/_components/PlayButton';
import { setFullscreenVideoUrl, setShowMoreOptions, setTargetEntry } from '../../../store/actions';

const Container = styled.div`
  position: relative;
  width: 100%;
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.07));
  border-radius: 10px;
  background-color: #ffffff;
  margin-bottom: 32px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 19px 16px;
  padding-bottom: 0;
  user-select: none;
`;

const User = styled.div`
  display: flex;
  margin-bottom: 18px;
`;

const UserInfo = styled.div`
  
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  margin-right: 10px;
  ${cursorPointer}
`;

const Username = styled.div`
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: 0.14px;
  color: #757575;

  ${cursorPointer}

  &:hover{
    text-decoration: underline;
  }
`;

const TimeInfo = styled.div`
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.32px;
  color: #757575;
`;

const Caption = styled.div`
  font-size: 15px;
  line-height: 21px;
  letter-spacing: -0.32px;
  color: #111111;
  padding: 0 16px;
  margin-bottom: 16px;
`;

const CoverWrapper = styled.div`
  position: relative;

  ${cursorPointer}
`;

const CoverPreview = styled.img`
  position: relative;
  width: 100%;
  height: auto;
  max-height: 388px;
  object-fit: cover;
  user-drag: none;
  user-select: none;
  border-radius: 0px 0px 10px 10px;

  ${cursorPointer}
`;

const PlayButtonWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  ${flexCenter}

  div{
    position: relative;
  }
`;

const TripleDots = styled.div`
  min-width: 50px;
  text-align: right;
  cursor: pointer;
  svg {
    color: #999999;
  }
`;

const Entry = (props) => {
  const dispatch = useDispatch();
  const presumedRole = useSelector(makeSelectPresumedRole());

  const {
    entry,
  } = props;

  const {
    username,
    profilePicture,
    id,
    contentUrl,
    date,
    caption,
  } = entry;

  const onOpenVideo = () => dispatch(setFullscreenVideoUrl(contentUrl));
  const onShowOptions = () => {
    dispatch(setTargetEntry(entry));
    dispatch(setShowMoreOptions(true));
  };

  const getTimeLabel = () => {
    const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(date * 1000);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date * 1000);
    return `${mo} ${da}`;
  };

  const openUserProfile = () => {
    Koji.ui.navigate.to(`https://withkoji.com/@${username}`);
  };

  const imageSrc = thumbnailFromVideoUrl(contentUrl, 1000);

  return (
    <Container>
      <Header>
        <User>
          <Avatar
            src={profilePicture}
            onClick={openUserProfile}
          />
          <UserInfo>
            <Username
              onClick={openUserProfile}
            >
              {username}
            </Username>
            <TimeInfo>
              {getTimeLabel()}
            </TimeInfo>
          </UserInfo>
        </User>

        <TripleDots onClick={onShowOptions}>
          <MoreHorizIcon />
        </TripleDots>
      </Header>

      <Caption>
        {caption}
      </Caption>

      <CoverWrapper
        onClick={onOpenVideo}
      >
        <CoverPreview
          src={imageSrc}
        />
        <PlayButtonWrapper>
          <PlayButton />
        </PlayButtonWrapper>
      </CoverWrapper>
    </Container>
  );
};

Entry.propTypes = {
  entry: PropTypes.object,
};

export default Entry;
