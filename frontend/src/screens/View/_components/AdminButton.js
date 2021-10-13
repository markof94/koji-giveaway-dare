import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectPresumedRole } from 'store/selectors';
import { cursorPointer } from 'resources/util/styles';
import { setShowAdmin } from '../../../store/actions';

const Container = styled.div`
  position: relative;  
  padding: 16px 0;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.32px;
  color: #007AFF;
  user-select: none;
  text-align: center;
  width: 100%;
  border-bottom: 1px solid #E5E5E5;

  ${cursorPointer}
`;

const AdminButton = (props) => {
  const dispatch = useDispatch();

  const onClick = () => dispatch(setShowAdmin(true));

  return (
    <Container onClick={onClick}>
      View Admin Dashboard
    </Container>
  );
};

AdminButton.propTypes = {};

export default AdminButton;
