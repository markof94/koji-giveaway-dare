import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Koji from '@withkoji/core';
import { useDispatch, useSelector } from 'react-redux';
import { cursorPointer, flexCenter } from '../../../../resources/util/styles';
import { makeSelectWinner } from '../../../../store/selectors';
import { thumbnailFromVideoUrl } from '../../../../resources/util/thumbnailFromVideoUrl';
import { postWinner } from '../../../../api/postWinner';
import { setFullscreenVideoUrl, setShowSingleEntry, setTargetEntry, setWinner } from '../../../../store/actions';
import isStringEmpty from '../../../../resources/util/isStringEmpty';

const Container = styled.div`
  width: 100%;
  border-top: 1px solid #E5E5E5;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 0;
  ${cursorPointer}
  user-select: none;
`;

const User = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const WinnerIcon = styled.div`
  ${flexCenter}
  margin-right: 16px;

  ${({ isWinner }) => isWinner && `
    position: absolute;
    top: 0;
    left: calc(100% + 5px);
    transform: translateY(-15%);
  `}
`;

const TrophySvg = () => (
  <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18.6377" r="18" fill="#E5E5E5" />
    <g clipPath="url(#clip0)">
      <path d="M24.8251 11.8128H22.8751V9.86279H13.1251V11.8128H11.1751C10.1026 11.8128 9.2251 12.6903 9.2251 13.7628V14.7378C9.2251 17.224 11.0971 19.252 13.5053 19.5543C14.1196 21.0168 15.4358 22.1185 17.0251 22.4403V25.4628H13.1251V27.4128H22.8751V25.4628H18.9751V22.4403C20.5643 22.1185 21.8806 21.0168 22.4948 19.5543C24.9031 19.252 26.7751 17.224 26.7751 14.7378V13.7628C26.7751 12.6903 25.8976 11.8128 24.8251 11.8128ZM11.1751 14.7378V13.7628H13.1251V17.4873C11.9941 17.0778 11.1751 16.0053 11.1751 14.7378ZM18.0001 20.5878C16.3913 20.5878 15.0751 19.2715 15.0751 17.6628V11.8128H20.9251V17.6628C20.9251 19.2715 19.6088 20.5878 18.0001 20.5878ZM24.8251 14.7378C24.8251 16.0053 24.0061 17.0778 22.8751 17.4873V13.7628H24.8251V14.7378Z" fill="white" />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="23.4" height="23.4" fill="white" transform="translate(6.30005 6.93774)" />
      </clipPath>
    </defs>
  </svg>
);

const WinnerSvg = () => (
  <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15.6377" r="15" fill="url(#paint0_linear)" />
    <path d="M20.25 10.3877H18.75V8.8877H11.25V10.3877H9.75C8.925 10.3877 8.25 11.0627 8.25 11.8877V12.6377C8.25 14.5502 9.69 16.1102 11.5425 16.3427C12.015 17.4677 13.0275 18.3152 14.25 18.5627V20.8877H11.25V22.3877H18.75V20.8877H15.75V18.5627C16.9725 18.3152 17.985 17.4677 18.4575 16.3427C20.31 16.1102 21.75 14.5502 21.75 12.6377V11.8877C21.75 11.0627 21.075 10.3877 20.25 10.3877ZM9.75 12.6377V11.8877H11.25V14.7527C10.38 14.4377 9.75 13.6127 9.75 12.6377ZM15 17.1377C13.7625 17.1377 12.75 16.1252 12.75 14.8877V10.3877H17.25V14.8877C17.25 16.1252 16.2375 17.1377 15 17.1377ZM20.25 12.6377C20.25 13.6127 19.62 14.4377 18.75 14.7527V11.8877H20.25V12.6377Z" fill="white" />
    <defs>
      <linearGradient id="paint0_linear" x1="2.19772e-06" y1="27.6445" x2="8.79059" y2="-3.16825" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00C6FF" />
        <stop offset="1" stopColor="#0072FF" />
      </linearGradient>
    </defs>
  </svg>
);

const CoverPreview = styled.img`
  position: relative;
  width: 40px;
  height: 40px;
  max-height: 388px;
  object-fit: cover;
  user-drag: none;
  user-select: none;
  border-radius: 5px;
  margin-right: 16px;
`;

const UserInfo = styled.div`
  margin-right: 5px;
`;

const Username = styled.div`
  font-weight: 600;
  font-size: 17px;
  line-height: 21px;
  letter-spacing: -0.41px;
  color: #111111;
  margin-bottom: 4px;
`;

const Date = styled.div`
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.32px;
  color: #757575;
`;

const NextIcon = styled.div`
  color: #999999;
  ${flexCenter}

  svg{
    font-size: 28px;
  }
`;

const Entry = (props) => {
  const dispatch = useDispatch();
  const winnerId = useSelector(makeSelectWinner());

  const { entry, onSetBusy } = props;
  const {
    userId,
    username,
    profilePicture,
    contentUrl,
    date,
  } = entry;

  const isWinner = winnerId === userId;
  const hasWinner = !isStringEmpty(winnerId);
  const imageSrc = thumbnailFromVideoUrl(contentUrl, 100);

  const getTimeLabel = () => {
    const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(date * 1000);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date * 1000);
    return `${mo} ${da}`;
  };

  const onSelectWinner = async () => {
    if (isWinner) return;
    onSetBusy(true);

    const confirmed = await Koji.ui.present.confirmation({
      title: `Select ${username} as winner?`,
      message: "You'll be able to repick a winner at any time.",
      confirmButtonLabel: 'Select Winner',
      cancelButtonLabel: 'Cancel',
    });

    if (confirmed) {
      const success = await postWinner(userId);
      if (success) dispatch(setWinner(userId));
    }

    onSetBusy(false);
  };

  const onOpenDetails = () => {
    dispatch(setTargetEntry(entry));
    dispatch(setShowSingleEntry(true));
  };

  const onOpenVideo = () => {
    dispatch(setFullscreenVideoUrl(contentUrl));
  };

  return (
    <Container onClick={onOpenDetails}>
      <User>

        {
          !hasWinner && (
            <WinnerIcon
              onClick={(e) => {
                e.stopPropagation();
                onSelectWinner();
              }}
            >
              <TrophySvg />
            </WinnerIcon>
          )
        }

        <CoverPreview
          src={imageSrc}
          onClick={(e) => {
            e.stopPropagation();
            onOpenVideo();
          }}
        />

        <UserInfo>
          <Username>{username}</Username>
          <Date>{getTimeLabel()}</Date>
          {
            hasWinner && isWinner && (
              <WinnerIcon isWinner>
                <WinnerSvg />
              </WinnerIcon>
            )
          }
        </UserInfo>
      </User>

      <NextIcon>
        <ChevronRightIcon />
      </NextIcon>
    </Container>
  );
};

Entry.propTypes = {
  entry: PropTypes.object,
  onSetBusy: PropTypes.func,
};

export default Entry;
