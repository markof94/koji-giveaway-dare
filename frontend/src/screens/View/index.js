import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import Koji from '@withkoji/core';
import UserMedia from '../../components/UserMedia';
import AdminButton from './_components/AdminButton';
import TopInfo from './_components/TopInfo';
import ActionSection from './_components/ActionSection';
import EntryList from './_components/EntryList';

import VideoRecorder from '../../components/VideoRecorder';
import { setPendingVideoUrl, setShowPostMenu, setShowRecordingMenu } from '../../store/actions';
import { makeSelectShowRecordingMenu, makeSelectPresumedRole, makeSelectShowPostMenu, makeSelectFullscreenVideoUrl, makeSelectShowMoreOptions, makeSelectShowAdmin, makeSelectShowSingleEntry } from '../../store/selectors';
import PostMenu from './_components/PostMenu';
import isStringEmpty from '../../resources/util/isStringEmpty';
import FullscreenVideo from './_components/FullscreenVideo';
import MoreOptions from './_components/MoreOptions';
import AdminPanel from './_components/AdminPanel';
import SingleEntryView from './_components/SingleEntryView';

const Container = styled(motion.div)`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #FFFFFF;
  overflow: hidden;
`;

const ScrollWrapper = styled.div`
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;
`;

const MediaWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 60vh;
`;

const View = (props) => {
  const dispatch = useDispatch();
  const presumedRole = useSelector(makeSelectPresumedRole());
  const showPostMenu = useSelector(makeSelectShowPostMenu());
  const showRecordingMenu = useSelector(makeSelectShowRecordingMenu());
  const fullscreenVideoUrl = useSelector(makeSelectFullscreenVideoUrl());
  const showMoreOptions = useSelector(makeSelectShowMoreOptions());
  const showAdmin = useSelector(makeSelectShowAdmin());
  const showSingleEntry = useSelector(makeSelectShowSingleEntry());

  const onHideRecordingMenu = () => dispatch(setShowRecordingMenu(false));

  const onFinishRecording = (url) => {
    dispatch(setPendingVideoUrl(url));
    onHideRecordingMenu();
    dispatch(setShowPostMenu(true));
  };

  const {
    coverMedia,
  } = Koji.remix.get();

  const showFullscreenVideo = !isStringEmpty(fullscreenVideoUrl);

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'circOut' }}
    >
      <ScrollWrapper className="pretty-scroll">
        {presumedRole === 'admin' && <AdminButton />}
        <TopInfo />
        <MediaWrapper>
          <UserMedia
            media={coverMedia}
          />
        </MediaWrapper>
        <ActionSection />
        <EntryList />
      </ScrollWrapper>

      <AnimatePresence>
        {
          showRecordingMenu && (
            <VideoRecorder
              title="Record Video Entry"
              permissionLabel="Enable access to record or upload your challenge."
              allowUpload
              showSendLabel
              onBack={onHideRecordingMenu}
              onUpload={(url) => onFinishRecording(url)}
              key="recorder"
            />
          )
        }

        {showPostMenu && <PostMenu key="postMenu" />}
        {showFullscreenVideo && <FullscreenVideo key="fullVideo" />}
        {showMoreOptions && <MoreOptions key="moreOptions" />}
        {showAdmin && <AdminPanel key="adminPanel" />}
        {showSingleEntry && <SingleEntryView key="singleEntryView" />}
      </AnimatePresence>

    </Container>
  );
};

View.propTypes = {};

export default View;
