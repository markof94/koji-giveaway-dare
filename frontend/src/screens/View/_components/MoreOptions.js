import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Koji from '@withkoji/core';
import styled from 'styled-components';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'components/Spinner';

import { get } from 'immutable';
import { makeSelectPresumedRole, makeSelectTargetEntry, makeSelectUserId } from '../../../store/selectors';
import { deleteEntry, setShowMoreOptions } from '../../../store/actions';
import { deleteEntry as apiDeleteEntry } from '../../../api/deleteEntry';

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  overflow: hidden;
  width: 100%;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Background = styled.div`
    position: absolute;
    inset: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    opacity: 0.3;
`;

const Wrapper = styled(motion.div)`
    margin: 0 12px 10px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Item = styled.div`
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 21px;
    text-align: center;
    letter-spacing: -0.41px;
    padding: 20px 0;
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    color: #111111;

    ${({ red }) => red && `
        color: #F44336;
    `}

    ${({ blue }) => blue && `
        color: #007AFF;
    `}

    & + & {
        border-top: 1px solid #F2F2F2;
    }
`;

const ButtonWrapper = styled.div`
    background-color: #fff;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;

    & + & {
        margin-top: 10px;
    }
`;

const MoreOptions = () => {
  const [busy, setBusy] = useState(false);

  const userId = useSelector(makeSelectUserId());
  const presumedRole = useSelector(makeSelectPresumedRole());
  const entry = useSelector(makeSelectTargetEntry());
  const { id, contentUrl, userId: ownerId, username } = entry;

  const dispatch = useDispatch();
  const onClose = () => dispatch(setShowMoreOptions(false));

  const onDelete = async () => {
    const confirmed = await Koji.ui.present.confirmation({
      title: 'Delete Entry',
      // eslint-disable-next-line quotes
      message: `Deleted entries cannot be recovered.`,
      confirmButtonLabel: 'Delete',
      cancelButtonLabel: 'Cancel',
    });

    if (confirmed) {
      setBusy(true);
      const success = await apiDeleteEntry(id);
      if (success) {
        Koji.ui.present.systemAlert('success');
        dispatch(deleteEntry(id));

        setTimeout(() => {
          onClose();
        }, 500);
      }
    }
  };

  const onShare = () => {
    Koji.ui.navigate.openShareDialog(`?entry=${entry.id}`);
    onClose();
  };

  const onDownload = () => {
    const downloadUrl = contentUrl.replace('.m3u8', `/high.mp4?download=${username}`);
    Koji.ui.navigate.to(downloadUrl);
  };

  const hasPrivileges = userId === ownerId || presumedRole === 'admin';

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.3 },
      }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <Background onClick={onClose} />
      <Wrapper
        initial={{ y: '100%' }}
        animate={{ y: '0' }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.3, ease: 'circOut' }}
      >
        <ButtonWrapper>
          <Item onClick={onShare}>Share to...</Item>

          {
            hasPrivileges &&
            <Item onClick={onDownload}>Download Video</Item>
          }

          {
            hasPrivileges &&
            <Item red onClick={onDelete}>Delete</Item>
          }
        </ButtonWrapper>

        <ButtonWrapper>
          <Item onClick={onClose}>Cancel</Item>
        </ButtonWrapper>

        {busy && <Spinner spinnerType="deleting" />}
      </Wrapper>
    </Container>
  );
};

MoreOptions.propTypes = {};

export default MoreOptions;
