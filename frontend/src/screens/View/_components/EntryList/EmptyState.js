import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import isStringEmpty from '../../../../resources/util/isStringEmpty';

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
    margin: 0;
    width: 100%;
    
    color: #111111;
    box-sizing: border-box;
    user-select: none;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  text-align: center;
  letter-spacing: 0.2px;
  color: #757575;
  margin-top: 6px;
`;

const Subtitle = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  letter-spacing: -0.32px;
  color: #757575;
  margin-top: 3px;
`;

const EmptyState = ({
  icon,
  title,
  subtitle,
  single = false,
}) => (
  <Container single={single}>
    {icon}
    {!isStringEmpty(title) && <Title>{title}</Title>}
    {!isStringEmpty(subtitle) && <Subtitle>{subtitle}</Subtitle>}
  </Container>
);

EmptyState.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.node,
  single: PropTypes.bool,
};

export default EmptyState;
