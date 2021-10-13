import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Koji from '@withkoji/core';
import HeaderMenu from '../../../../components/HeaderMenu';
import { setFullscreenVideoUrl, setShowPostMenu } from '../../../../store/actions';
import TextareaTransparent from '../../../../components/TextareaTransparent';
import { makeSelectPendingVideoUrl } from '../../../../store/selectors';
import { thumbnailFromVideoUrl } from '../../../../resources/util/thumbnailFromVideoUrl';
import { cursorPointer } from '../../../../resources/util/styles';
import TextInputTransparent from '../../../../components/TextInputTransparent';
import StandardButton from '../../../../components/StandardButton';
import FullscreenLoading from '../../../../components/FullscreenLoading';
import { postEntry } from '../../../../api/postEntry';
import { getUserInfo } from '../../../../api/Koji/getUserInfo';
import isEmailValid from '../../../../resources/util/isEmailValid';
import Spinner from '../../../../components/Spinner';
import isStringEmpty from '../../../../resources/util/isStringEmpty';

const Container = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: white;
  z-index: 10;
`;

const CaptionContainer = styled.div`
  display: flex;
  height: 150px;
  min-height: 130px;
  padding: 20px 18px;
  margin-bottom: 20px;
`;

const VideoPreview = styled.div`
  position: relative;
  min-width: 100px;
  min-height: 130px;
  margin-right: 12px;

  background-color: #757575;
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

  ${cursorPointer}
`;

const Border = styled.div`
  border-top: 1px solid #E5E5E5;
  width: 100%;
`;

const EmailContainer = styled.div`
  padding: 0 18px;
`;

const Margin = styled.div`
  margin-top: ${({ margin }) => margin}px;
`;

const PostMenu = (props) => {
  const pendingVideoUrl = useSelector(makeSelectPendingVideoUrl());

  const dispatch = useDispatch();
  const onClose = async (showAlert) => {
    if (showAlert) {
      const confirmed = await Koji.ui.present.confirmation({
        title: 'Discard Entry',
        message: "If you exit now, you'll lose any progress you've made so far.",
        cancelButtonLabel: 'Cancel',
        confirmButtonLabel: 'Discard',
      });

      if (confirmed) close();
      return;
    }

    close();
  };

  const close = () => dispatch(setShowPostMenu(false));

  const onOpenVideo = () => dispatch(setFullscreenVideoUrl(pendingVideoUrl));

  const [caption, setCaption] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isStringEmpty(email)) return;
    setIsEmailInvalid(false);
  }, [email]);

  const onSubmit = async () => {
    setBusy(true);

    const userInfo = await getUserInfo();

    const emailValid = isEmailValid(email);

    if (!emailValid) {
      Koji.ui.present.alert({
        title: 'Error',
        message: 'Please enter a valid e-mail address',
      });
      setIsEmailInvalid(true);
      setBusy(false);
      return;
    }

    const {
      username,
      profilePicture,
    } = userInfo;

    const data = {
      contentUrl: pendingVideoUrl,
      username,
      profilePicture,
      caption,
      email,
    };

    await postEntry(data);

    Koji.ui.present.systemAlert('success');

    setBusy(false);
    onClose();
  };

  return (
    <Container
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
      key="postMenu1"
    >
      <HeaderMenu
        title="Submit Entry"
        onDismiss={() => onClose(true)}
      />

      <CaptionContainer>
        <VideoPreview
          src={thumbnailFromVideoUrl(pendingVideoUrl, 400)}
          onClick={onOpenVideo}
        />

        <TextareaTransparent
          maxLength={500}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption (optional)"
        />
      </CaptionContainer>

      <EmailContainer>
        <Border />
        <TextInputTransparent
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your e-mail"
          errorLabel={isEmailInvalid ? 'Email Required' : ''}
        />

        <Border />
        <Margin margin={60} />
        <StandardButton
          onClick={onSubmit}
        >
          Submit
        </StandardButton>
      </EmailContainer>

      {busy && <Spinner spinnerType="posting" />}
    </Container>
  );
};

PostMenu.propTypes = {};

export default PostMenu;
