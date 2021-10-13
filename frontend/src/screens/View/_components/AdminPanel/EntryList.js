import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import HeaderMenu from '../../../../components/HeaderMenu';
import { setShowAdmin } from '../../../../store/actions';
import ChooseWinner from './ChooseWinner';
import { cursorPointer, flexCenter } from '../../../../resources/util/styles';
import { makeSelectEntries, makeSelectWinner } from '../../../../store/selectors';
import Entry from './Entry';
import EmptyState from '../EntryList/EmptyState';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import NoEntries from '../../../../resources/icons/NoEntries';
import FullscreenLoading from '../../../../components/FullscreenLoading';
import isStringEmpty from '../../../../resources/util/isStringEmpty';

const Container = styled(motion.div)`
  position: relative;
  width: 100%;
  padding: 0 20px;
  border-bottom: 1px solid #E5E5E5;
`;

const Header = styled.div`
  ${flexCenter}
  justify-content: space-between;
  width: 100%;
  margin-bottom: 19px;
  margin-top: 30px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 0.35px;
  color: #111111;
`;

const DownloadButton = styled.a`
  ${flexCenter}

  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  letter-spacing: -0.08px;
  text-transform: uppercase;
  color: #007AFF;

  ${cursorPointer}
  user-select: none;

  svg{
    margin-right: 4px;
  }

  :link{
    text-decoration: none;

    &:hover{
      text-decoration: underline;
    }
  }
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  ${flexCenter}
`;

const DownloadIcon = () => (
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 15.6382V18.6382H6V15.6382H4V18.6382C4 19.7382 4.9 20.6382 6 20.6382H18C19.1 20.6382 20 19.7382 20 18.6382V15.6382H18ZM17 11.6382L15.59 10.2282L13 12.8082V4.63818H11V12.8082L8.41 10.2282L7 11.6382L12 16.6382L17 11.6382Z" fill="#007AFF" />
  </svg>
);

const getCsvLink = (records) => {
  const csvObject = [
    'ID,USERNAME,EMAIL,VIDEO ENTRY,CAPTION,ENTERED DATE',
  ];

  records.forEach((record) => {
    const { id, username, email, contentUrl, caption, date } = record;

    const dateString = new Date(date * 1000).toLocaleDateString();
    const videoUrl = contentUrl.replace('.m3u8', '/high.mp4');

    csvObject.push(
      [
        sanitizeCsv(id),
        sanitizeCsv(username),
        sanitizeCsv(email),
        sanitizeCsv(videoUrl),
        sanitizeCsv(caption),
        sanitizeCsv(dateString),
      ].join(',')
    );
  });

  const blob = new Blob([csvObject.join('\n')], { type: 'text/csv' });
  const csvUrl = window.URL.createObjectURL(blob);
  return csvUrl;
};

const sanitizeCsv = (value) => {
  try {
    return `"${String(value || '').replace(/"/g, '""')}"`;
  } catch (err) {
    return '';
  }
};

const EntriesContainer = styled.div`
  width: 100%;
`;

const EntryList = (props) => {
  const entries = useSelector(makeSelectEntries());
  const winnerId = useSelector(makeSelectWinner());

  const hasLoaded = entries !== null;
  const hasEntries = hasLoaded && entries.length > 0;

  const {
    onSetBusy,
  } = props;

  const sortedEntries = isStringEmpty(winnerId) ? entries : entries.sort((a, b) => {
    if (a.userId === winnerId) return -1;
    if (b.userId === winnerId) return 1;
    return 0;
  });

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
    >

      {!hasLoaded && <SpinnerWrapper><LoadingSpinner color="#111111" /></SpinnerWrapper>}

      {
        hasLoaded && !hasEntries && (
          <EmptyState
            icon={<NoEntries />}
            title="No Entries"
            subtitle="Entries will show up here once submitted"
          />
        )
      }

      {
        hasLoaded && hasEntries && (
          <>
            <Header>
              <Title>
                Entries
              </Title>
              <DownloadButton
                href={getCsvLink(entries)}
                download="participants.csv"
                target="_top"
              >
                <DownloadIcon />
                DOWNLOAD ALL
              </DownloadButton>
            </Header>

            <EntriesContainer>
              {sortedEntries.map((entry) => (
                <Entry
                  key={entry.id}
                  entry={entry}
                  onSetBusy={onSetBusy}
                />
              ))}
            </EntriesContainer>
          </>
        )
      }
    </Container>
  );
};

EntryList.propTypes = {
  onSetBusy: PropTypes.func,
};

export default EntryList;
