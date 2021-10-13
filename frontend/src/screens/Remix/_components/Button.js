import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #999999;
  padding: 8px 15px;
  padding-right: 10px;
  background: #FFFFFF;
  ${(props) => props.isInvalid && `
    border-color: red;
  `}
`;

const Label = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 22px;
  display: flex;
  align-items: center;
  letter-spacing: -0.41px;
  color: #111111;
`;

const AddLabel = styled.div`
  background: #F2F2F2;
  border-radius: 10px;
  padding: 10px 17px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.4px;
  color: #007AFF;
`;

const Button = ({
  onClick,
  isInvalid,
}) => (
  <Container
    onClick={onClick}
  >
    <Wrapper
      isInvalid={isInvalid}
    >
      <Label>
        Cover Photo or Video
      </Label>

      <AddLabel>
        Add
      </AddLabel>
    </Wrapper>
  </Container>
);

Button.propTypes = {
  isInvalid: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
