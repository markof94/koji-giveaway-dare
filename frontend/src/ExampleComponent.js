import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectPresumedRole } from 'store/selectors';

const Container = styled.div`
  
`;

const Component = (props) => {
  const dispatch = useDispatch();
  const presumedRole = useSelector(makeSelectPresumedRole());

  return (
    <Container>

    </Container>
  );
};

Component.propTypes = {};

export default Component;
