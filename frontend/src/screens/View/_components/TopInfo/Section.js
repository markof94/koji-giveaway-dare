import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import isStringEmpty from '../../../../resources/util/isStringEmpty';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 12px 0;

  ${({ borderRight }) => borderRight && `
    border-right: 1px solid #E5E5E5;
  `}
`;

const Number = styled.div`
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 0.35px;
  color: #111111;
  margin-bottom: 2px;

  ${({ color }) => color && `
    color: ${color};
  `}
`;

const Text = styled.div`
  font-size: 15px;
  line-height: 21px;
  letter-spacing: -0.32px;
  color: #757575;

  ${({ color }) => color && `
    color: ${color};
  `}
`;

const Section = (props) => {
  const {
    number,
    text,
    color,
    borderRight,
    isLoading,
  } = props;

  return (
    <Container borderRight={borderRight}>
      {
        isLoading ?
          <LoadingSpinner color="#111111" />
          : (
            <>
              <Number color={color}>{number}</Number>
              {
                !isStringEmpty(text) &&
                <Text color={color}>{text}</Text>
              }
            </>
          )
      }
    </Container>
  );
};

Section.propTypes = {
  number: PropTypes.any,
  text: PropTypes.string,
  color: PropTypes.string,
  borderRight: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default Section;
