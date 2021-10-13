import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectRemixData,
} from 'store/selectors';

import { moneyString } from 'resources/helpers/moneyString';

const Container = styled.div`
  position: absolute;
  height: 100%;
  left: calc(50% + ${35 + 14}px);
  max-width: 95px;
  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;

  font-size: 15px;
  line-height: 21px;
  font-weight: normal;
  color: white;
  letter-spacing: -0.32px;
`;

const AttributionLabel = ({ remixData }) => {
  const {
    price,
  } = remixData;

  return (
    <Container>
      {`Send Request for ${moneyString(price)}`}
    </Container>
  );
};

AttributionLabel.propTypes = {
  remixData: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
  //
});

const mapStateToProps = createStructuredSelector({
  remixData: makeSelectRemixData(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AttributionLabel);
