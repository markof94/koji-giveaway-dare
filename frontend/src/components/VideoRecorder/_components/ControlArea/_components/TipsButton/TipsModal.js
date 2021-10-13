import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import CakeIcon from './icons/Cake';
import IdentityIcon from './icons/Badge';
import ListIcon from './icons/FormattedList';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 100vh;

  background-color: rgba(0,0,0,0);

  display: flex;
  align-items: center;
  z-index: 9999;
`;

const Background = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  align-items: center;
`;

const Container = styled(motion.div)`
  position: absolute;
  bottom: 62px;
  left: 30px;
  width: calc(100% - 60px);

  padding: 48px 26px 26px;
  background: ${({ theme }) => theme.colors['background.default']};

  border-radius: 12px;
  transform-origin: bottom left;
`;

const Title = styled.div`
  height: 100%;
  margin-bottom: 15px;
  text-align: center;

  font-weight: bold;
  color: ${({ theme }) => theme.colors['foreground.default']};
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 0.35px;
`;

const Items = styled.div`
  width: 100%;
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;

  svg {
    width: 30px;
    min-width: 30px;
    max-width: 30px;
    margin-right: 17px;
    height: 30px;
  }

  padding-bottom: 21px;
  margin-top: 19px;
  border-bottom: 1px solid ${({ theme }) => theme.colors['border.secondary']};
  color: ${({ theme }) => theme.colors['foreground.default']};

  &:last-of-type {
    border-bottom-color: transparent;
  }
`;

const Value = styled.div`
  width: 100%;
`;

const ItemTitle = styled.div`
  padding-top: 3px;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.2px;
  text-align: left;
`;

const ItemValue = styled.div`
  margin-top: 2px;
  font-size: 12px;
  line-height: 18px;
  text-align: left;
  font-weight: normal;
`;

const SubmitRow = styled.div`
  width: 100%;
  display: flex;
`;

const SubmitButton = styled.button`
  border-radius: 100px;
  padding: 11px 15px 10px;

  background: ${({ theme }) => theme.colors['button.background']};
  color: ${({ theme }) => theme.colors['button.foreground']};

  margin-top: 20px;
  margin-left: auto;

  text-transform: uppercase;
  font-size: 15px;
  line-height: 16px;
  font-weight: 600;
  letter-spacing: -0.24px;
`;

const TipsModal = ({ onDismiss }) => (
  <Wrapper onClick={() => onDismiss()}>
    <Background
      key="modal-background"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 0.25,
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    />
    <Container
      initial={{ scale: 0 }}
      animate={{
        scale: 1,
      }}
      exit={{ scale: 0 }}
      transition={{
        duration: 0.25,
        ease: 'easeOut',
      }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Title>
        Tips to Recording the Perfect Request
      </Title>

      <Items>
        <Item>
          <CakeIcon />
          <Value>
            <ItemTitle>What&apos;s the occasion?</ItemTitle>
            <ItemValue>Birthday? Graduation? Looking for advice? Be specific on what you&apos;re looking for.</ItemValue>
          </Value>
        </Item>

        <Item>
          <IdentityIcon />
          <Value>
            <ItemTitle>Who is this for?</ItemTitle>
            <ItemValue>For you or friends and family, let us know who they are and how to pronounce their names.</ItemValue>
          </Value>
        </Item>

        <Item>
          <ListIcon />
          <Value>
            <ItemTitle>Anything else?</ItemTitle>
            <ItemValue>Including all relevant details will help guarantee you the best possible video.</ItemValue>
          </Value>
        </Item>
      </Items>

      <SubmitRow>
        <SubmitButton onClick={() => onDismiss()}>
          Got It
        </SubmitButton>
      </SubmitRow>
    </Container>
  </Wrapper>
);

TipsModal.propTypes = {
  onDismiss: PropTypes.func,
};

export default TipsModal;
