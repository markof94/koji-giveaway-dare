import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    height: 54px;
    padding: 0 16px;
    z-index: 50;

    background: rgba(248, 248, 248, 0.92);
    backdrop-filter: blur(15px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Title = styled.div`
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    text-align: center;
    letter-spacing: -0.41px;
    width: 100%;
`;

const Button = styled.div`
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    text-align: right;
    letter-spacing: -0.41px;
    cursor: pointer;
    color: #007AFF;
    width: 100px;
`;

const Header = (props) => {
  const {
    onNext,
    onCancel,
    title,
  } = props;

  return (
    <Container>
      <Button
        style={{ textAlign: 'left' }}
        onClick={onCancel}
      >
        Cancel
      </Button>

      <Title>{title}</Title>

      <Button onClick={onNext}>Next</Button>
    </Container>
  );
};

Header.propTypes = {
  onNext: PropTypes.func,
  onCancel: PropTypes.func,
  title: PropTypes.string,
};

export default Header;
