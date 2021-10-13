import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { makeSelectEntries, makeSelectPresumedRole, makeSelectWinnerEntry } from '../../../../store/selectors';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import EmptyState from './EmptyState';
import NoEntries from '../../../../resources/icons/NoEntries';
import Entry from '../Entry';
import { flexCenter } from '../../../../resources/util/styles';

const Container = styled.div`
  padding: 0 20px;
  padding-bottom: 70px;

  @media(min-width: 699px){
    padding-left: 75px;
    padding-right: 75px;
  }
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  ${flexCenter}
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.2px;
  color: #111111;
  margin-bottom: 20px;
  text-align: center;
  user-select: none;
`;

const EntriesContainer = styled(motion.div)`

`;

const WinnerIcon = styled.div`
  ${flexCenter}
`;

const WinnerLabel = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.2px;
  color: #111111;
  margin-top: 8px;
  margin-bottom: 20px;
  text-align: center;
  user-select: none;
`;

const WinnerSvg = () => (
  <svg width="50" height="51" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="25.688" r="25" fill="url(#paint0_linear)" />
    <path d="M33.75 16.938H31.25V14.438H18.75V16.938H16.25C14.875 16.938 13.75 18.063 13.75 19.438V20.688C13.75 23.8755 16.15 26.4755 19.2375 26.863C20.025 28.738 21.7125 30.1505 23.75 30.563V34.438H18.75V36.938H31.25V34.438H26.25V30.563C28.2875 30.1505 29.975 28.738 30.7625 26.863C33.85 26.4755 36.25 23.8755 36.25 20.688V19.438C36.25 18.063 35.125 16.938 33.75 16.938ZM16.25 20.688V19.438H18.75V24.213C17.3 23.688 16.25 22.313 16.25 20.688ZM25 28.188C22.9375 28.188 21.25 26.5005 21.25 24.438V16.938H28.75V24.438C28.75 26.5005 27.0625 28.188 25 28.188ZM33.75 20.688C33.75 22.313 32.7 23.688 31.25 24.213V19.438H33.75V20.688Z" fill="white" />
    <defs>
      <linearGradient id="paint0_linear" x1="3.66286e-06" y1="45.6993" x2="14.651" y2="-5.65526" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00C6FF" />
        <stop offset="1" stopColor="#0072FF" />
      </linearGradient>
    </defs>
  </svg>
);

const EntryList = (props) => {
  const dispatch = useDispatch();
  const entries = useSelector(makeSelectEntries());
  const winner = useSelector(makeSelectWinnerEntry());

  const hasLoaded = entries !== null;
  const hasEntries = hasLoaded && entries.length > 0;

  const title = hasEntries ? `All Entries (${entries.length.toLocaleString()})` : '';

  return (
    <Container>

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
          <EntriesContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
          >

            {
              winner && (
                <>
                  <WinnerIcon><WinnerSvg /></WinnerIcon>
                  <WinnerLabel>Winner</WinnerLabel>
                  <Entry
                    entry={winner}
                  />
                </>
              )
            }

            <Title>{title}</Title>

            {
              entries.map((entry) => (
                <Entry
                  key={entry.id}
                  entry={entry}
                />
              ))
            }
          </EntriesContainer>
        )
      }
    </Container>
  );
};

EntryList.propTypes = {};

export default EntryList;
