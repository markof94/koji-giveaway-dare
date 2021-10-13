import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import StandardButton from './StandardButton';
import { cursorPointer } from '../resources/util/styles';
import isStringEmpty from '../resources/util/isStringEmpty';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FFFFFF;
  border-bottom: 1px solid #F2F2F2;
  padding: 0 16px;

  ${({ noBorder }) => noBorder && `
    border: 0;
  `}
`;

const Item = styled.div`
  position: relative;
  width: 100%;
  color: #111111;
  user-select: none;
  min-width: 72px;
  flex: 1;
`;

const CloseButton = styled(Item)`
  display: flex;
  align-items: center;
  width: 24px;

  ${cursorPointer}
`;

const Title = styled(Item)`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  letter-spacing: -0.24px;
  min-width: 200px;
`;

const FinishButton = styled(StandardButton)`
  font-size: 16px;
  line-height: 20px;
  height: 32px;
  width: 72px;
  padding: 6px 16px;

  ${cursorPointer}

  ${({ naked }) => naked && `
    background-color: transparent;
    color: #007AFF;  
  `}
`;

const HeaderMenu = (props) => {
  const {
    title,
    onDismiss,
    onDone,
    doneLabel,
    disabled,
    naked,
    noBorder,
  } = props;

  return (
    <Container
      noBorder={noBorder}
    >
      <CloseButton
        onClick={onDismiss}
      >
        <CloseRoundedIcon />
      </CloseButton>

      <Title>
        {title}
      </Title>

      {
        !isStringEmpty(doneLabel) ? (
          <FinishButton
            invalid={disabled}
            onClick={onDone}
            naked={naked}
          >
            {doneLabel}
          </FinishButton>
        )
          :
          <Item />
      }
    </Container>
  );
};

HeaderMenu.propTypes = {
  title: PropTypes.string,
  onDismiss: PropTypes.func,
  onDone: PropTypes.func,
  doneLabel: PropTypes.string,
  disabled: PropTypes.bool,
  naked: PropTypes.bool,
  noBorder: PropTypes.bool,
};

export default HeaderMenu;
