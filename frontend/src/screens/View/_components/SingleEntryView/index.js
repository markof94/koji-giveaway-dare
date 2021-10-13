import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Koji from '@withkoji/core';

import HeaderMenu from '../../../../components/HeaderMenu';
import { setShowSingleEntry } from '../../../../store/actions';
import { makeSelectTargetEntry, makeSelectPresumedRole, makeSelectWinner } from '../../../../store/selectors';
import Entry from '../Entry';
import StandardButton from '../../../../components/StandardButton';

const Container = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: #F3F3F3;
  z-index: 20;
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
  padding-top: 30px;
  overflow-y: auto;
  height: calc(100vh - 53px);

  @media(min-width: 699px){
    padding-left: 75px;
    padding-right: 75px;
  }
`;

const AdminInfoWrapper = styled.div`
  padding-bottom: 30px;
`;

const Username = styled.div`
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  text-align: center;
  letter-spacing: 0.35px;
  color: #111111;
  margin-bottom: 2px;
`;

const Email = styled.div`
  font-size: 15px;
  line-height: 21px;
  text-align: center;
  letter-spacing: -0.32px;
  color: #757575;
  margin-bottom: 14px;
`;

const Button = styled(StandardButton)`
  width: auto;
  height: auto;
  padding: 10px 17px;
  width: 200px;
  margin: 0 auto;
  min-height: 37px;
`;

const SingleEntryView = (props) => {
  const dispatch = useDispatch();
  const presumedRole = useSelector(makeSelectPresumedRole());
  const entry = useSelector(makeSelectTargetEntry());
  const winner = useSelector(makeSelectWinner());

  const {
    username,
    email,
    userId,
  } = entry;

  const onClose = () => dispatch(setShowSingleEntry(false));
  const isWinner = winner === userId;

  const onContact = () => {
    Koji.ui.navigate.to(`mailto:${email}`);
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
      key="detailsView1"
    >
      <HeaderMenu
        title={`${username}'s Entry`}
        onDismiss={() => onClose()}
        noBorder
      />

      <ContentWrapper
        className="pretty-scroll"
      >
        {
          presumedRole === 'admin' && (
            <AdminInfoWrapper>
              <Username>{username}</Username>
              <Email>{email}</Email>

              {
                isWinner && (
                  <Button onClick={onContact}>
                    CONTACT WINNER
                  </Button>
                )
              }

            </AdminInfoWrapper>
          )
        }

        <Entry
          entry={entry}
        />
      </ContentWrapper>
    </Container>
  );
};

SingleEntryView.propTypes = {};

export default SingleEntryView;
