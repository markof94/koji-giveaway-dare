import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Koji from '@withkoji/core';

import { makeSelectEntries, makeSelectWinner, makeSelectWinnerEntry } from '../../../../store/selectors';
import isStringEmpty from '../../../../resources/util/isStringEmpty';
import StandardButton from '../../../../components/StandardButton';
import { deleteWinner } from '../../../../api/deleteWinner';
import { setShowSingleEntry, setTargetEntry, setWinner } from '../../../../store/actions';

const Container = styled.div`
  position: relative;
  width: 100%;
  background: #F9F9F9;
  padding-top: 16px;
  padding-bottom: 24px;

  font-size: 14px;
  line-height: 21px;
  text-align: center;
  letter-spacing: -0.32px;
  color: #111111;
`;

const Text = styled.div`
  margin-bottom: 8px;
  white-space: pre-wrap;
`;

const Button = styled(StandardButton)`
  width: auto;
  height: auto;
  padding: 10px 15px;
  width: 270px;
  margin: 0 auto;
`;

const InfoButton = styled(Button)`
  border: 0;
  background: #E5E5E5;
  margin-bottom: 8px;
`;

const ChooseWinner = (props) => {
  const dispatch = useDispatch();

  const winnerEntry = useSelector(makeSelectWinnerEntry());
  const hasWinner = winnerEntry != null;

  const { onSetBusy, onSetShowSpinnerPicker } = props;

  const onRepick = async () => {
    onSetBusy(true);

    const confirmed = await Koji.ui.present.confirmation({
      title: 'Re-pick a winner?',
      message: 'This will remove the current winner selection.',
      cancelButtonLabel: 'Cancel',
      confirmButtonLabel: 'Re-Pick Winner',
    });

    if (!confirmed) {
      onSetBusy(false);
      return;
    }

    const success = await deleteWinner();
    if (success) dispatch(setWinner(null));
    onSetBusy(false);
  };

  const onRandomPick = () => {
    onSetShowSpinnerPicker(true);
  };

  const onOpenWinner = () => {
    dispatch(setTargetEntry(winnerEntry));
    dispatch(setShowSingleEntry(true));
  };

  const pickButtonLabel = hasWinner ? 'RE-PICK WINNER' : 'RANDOMLY PICK A WINNER';
  const infoButtonLabel = 'VIEW WINNER INFO';
  const labelText = hasWinner ? `Giveaway Winner: ${winnerEntry.username}` : 'Manually pick a winner by tapping on a trophy\nfrom the list below or';

  return (
    <Container>
      <Text>{labelText}</Text>

      {
        hasWinner && (
          <InfoButton
            invert
            onClick={onOpenWinner}
          >
            {infoButtonLabel}
          </InfoButton>
        )
      }

      <Button
        invert
        onClick={hasWinner ? onRepick : onRandomPick}
      >
        {pickButtonLabel}
      </Button>
    </Container>
  );
};

ChooseWinner.propTypes = {
  onSetBusy: PropTypes.func,
  onSetShowSpinnerPicker: PropTypes.func,
};

export default ChooseWinner;
