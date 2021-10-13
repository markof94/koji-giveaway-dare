import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import LoadingSpinner from './LoadingSpinner';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);

  svg {
    color: #ffffff;
  }
  span {
    margin-top: 12px;
    font-style: normal;
    font-size: 17px;
    line-height: 23px;
    text-align: center;
    letter-spacing: 0.2px;
    color: #111111;
  }
`;

const InnerDiv = styled.div`
    display: flex;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 35px 48px 35px 48px;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(45px);
    border-radius: 15px;
`;

const CheckWrapper = styled.div`
  background: #007AFF;
  border-radius: 50%;
  width: 54px;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 37px;
  }
`;

const Spinner = ({ spinnerType }) => {
  let label = null;

  if (spinnerType === 'posting') {
    label = 'Submitting';
  } else if (spinnerType === 'deleting') {
    label = 'Deleting';
  } else if (spinnerType === 'deleted') {
    label = 'Deleted';
  } else if (spinnerType === 'posted') {
    label = 'Success';
  } else if (spinnerType === 'approving') {
    label = 'Approving';
  } else if (spinnerType === 'approved') {
    label = 'Approved';
  } else if (spinnerType === 'rejecting') {
    label = 'Rejecting';
  } else if (spinnerType === 'rejected') {
    label = 'Rejected';
  }
  return (
    <Container>
      <InnerDiv>
        {['loading', 'posting', 'deleting', 'approving', 'rejecting'].includes(spinnerType) ?
          <LoadingSpinner size={50} /> : (
            <CheckWrapper>
              <CheckRoundedIcon />
            </CheckWrapper>
          )}
        {label && (
          <span>{label}</span>
        )}
      </InnerDiv>
    </Container>
  );
};

Spinner.propTypes = {
  spinnerType: PropTypes.string,
};

export default Spinner;
