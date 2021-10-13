import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import HeaderMenu from '../../../../components/HeaderMenu';
import { setShowAdmin } from '../../../../store/actions';
import ChooseWinner from './ChooseWinner';
import EntryList from './EntryList';
import FullscreenLoading from '../../../../components/FullscreenLoading';
import WinnerSpinner from './WinnerSpinner';

const Container = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: white;
  z-index: 10;
`;

const ScrollArea = styled.div`
  height: calc(100vh - 53px);
  width: 100%;
  overflow-y: auto;
`;

const AdminPanel = (props) => {
  const dispatch = useDispatch();
  const onClose = () => dispatch(setShowAdmin(false));
  const [busy, setBusy] = useState(false);
  const [showSpinnerPicker, setShowSpinnerPicker] = useState(false);

  return (
    <Container
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
      key="adminPanel1"
    >
      <HeaderMenu
        title="Admin Dashboard"
        onDismiss={() => onClose(true)}
      />

      <ScrollArea className="pretty-scroll">
        <ChooseWinner
          onSetBusy={setBusy}
          onSetShowSpinnerPicker={setShowSpinnerPicker}
        />
        <EntryList onSetBusy={setBusy} />
      </ScrollArea>

      <AnimatePresence>
        {
          showSpinnerPicker &&
          <WinnerSpinner onClose={() => setShowSpinnerPicker(false)} />
        }
      </AnimatePresence>

      {
        busy &&
        <FullscreenLoading />
      }

    </Container>
  );
};

AdminPanel.propTypes = {};

export default AdminPanel;
