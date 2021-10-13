import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import CloseRounded from '@material-ui/icons/CloseRounded';
import CircularProgress from '@material-ui/core/CircularProgress';

import { cursorPointer, flexCenter } from '../../../../../resources/util/styles';
import { makeSelectEntries, makeSelectWinner, makeSelectWinnerEntry } from '../../../../../store/selectors';
import isStringEmpty from '../../../../../resources/util/isStringEmpty';
import WordSpinner from './WordSpinner';
import Confetti from './Confetti';
import { setShowSingleEntry, setTargetEntry, setWinner } from '../../../../../store/actions';
import { postWinner } from '../../../../../api/postWinner';
import StandardButton from '../../../../../components/StandardButton';
import LoadingSpinner from '../../../../../components/LoadingSpinner';

const Container = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  ${flexCenter}
  background: rgba(0, 0, 0, 0.5);
  user-select: none;
`;

const Modal = styled(motion.div)`
  position: relative;
  width: 80vw;
  max-width: 380px;
  background: white;
  padding: 60px 0;
  border-radius: 15px;
`;

const Title = styled.div`
  font-size: 22px;
  line-height: 26px;
  text-align: center;
  letter-spacing: 0.35px;
  color: #757575;
`;

const SpinnerContainer = styled.div`
  margin: 40px 0px;
  text-align: center;
`;

const WinnerContainer = styled(motion.div)`
  text-align: center;
  margin: 30px 0px;
`;

const WinnerName = styled.div`
  font-weight: bold;
  font-size: 34px;
  line-height: 41px;
  text-align: center;
  letter-spacing: 0.4px;
  color: #111111;
  margin-bottom: 4px;
`;

const WinnerEmail = styled.a`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  letter-spacing: -0.24px;
  color: #111111;

  :link{
    text-decoration: none;
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  left: 18px;
  top: 18px;
  ${flexCenter}
  ${cursorPointer}
`;

const Button = styled(StandardButton)`
  width: auto;
  padding: 10px 15px;
  width: 260px;
  margin: 0 auto;
`;

const ButtonCircularProgress = styled(CircularProgress)`
  color: ${(props) => `${props.customColor}` || 'white'};
`;

const WinnerSpinner = (props) => {
  const dispatch = useDispatch();

  const entries = useSelector(makeSelectEntries());
  const winnerEntry = useSelector(makeSelectWinnerEntry());
  const spinnerRef = useRef();

  const { onClose } = props;

  const [isFinished, setIsFinished] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hideEmail = (email) => {
    const splitted = email.split('@');

    return `${splitted[0].charAt(0)}***@${splitted[1]}`;
  };

  const onOpenWinner = () => {
    dispatch(setTargetEntry(winnerEntry));
    dispatch(setShowSingleEntry(true));
    onClose();
  };

  const showSpinner = isFinished === false || !winnerEntry;

  return (
    <Container
      key="spinner-dialog-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
    >
      <Modal
        id="spinner-dialog-container"
        key="spinner-dialog"
        initial={{ opacity: 0, scale: '0.5, 0.5' }}
        animate={{ opacity: 1, scale: '1, 1' }}
        exit={{ opacity: 0, scale: '0.5, 0.5', transition: { duration: 0.25 } }}
      >
        <Title>And the winner is...</Title>
        {showSpinner ? (
          <SpinnerContainer>
            <WordSpinner
              ref={spinnerRef}
              onDone={async (winnerParticipant) => {
                setIsSubmitting(true);
                setIsSpinning(false);
                const success = await postWinner(winnerParticipant.userId);
                if (success) {
                  dispatch(setWinner(winnerParticipant.userId));
                  Confetti.resultsFireworks(4);
                }
                setIsSubmitting(false);
                setIsFinished(true);
              }}
              participants={entries}
            />

            <StandardButton
              disabled={isSpinning || isSubmitting}
              style={{ width: '136px', margin: '0 auto' }}
              onClick={() => {
                setIsSpinning(true);
                spinnerRef.current.spin();
              }}
              isRounded
            >
              {(isSubmitting || isSpinning) ? (
                <LoadingSpinner color="#FFFFFF" />
              ) : (
                'Spin'
              )}
            </StandardButton>
          </SpinnerContainer>
        ) : (
          <WinnerContainer
            initial={{ opacity: 0, scale: '0.5, 0.5' }}
            animate={{ opacity: 1, scale: '1, 1' }}
          >
            <WinnerName>{winnerEntry.username}</WinnerName>

            <WinnerEmail href={`mailto:${winnerEntry.email}`}>
              {hideEmail(winnerEntry.email)}
            </WinnerEmail>
          </WinnerContainer>
        )}

        {
          !showSpinner && (
            <Button
              secondary
              onClick={onOpenWinner}
            >
              View Winner Info
            </Button>
          )
        }

        <CloseIcon onClick={onClose}>
          <CloseRounded />
        </CloseIcon>
      </Modal>
    </Container>
  );
};

WinnerSpinner.propTypes = {
  onClose: PropTypes.func,
};

export default WinnerSpinner;
