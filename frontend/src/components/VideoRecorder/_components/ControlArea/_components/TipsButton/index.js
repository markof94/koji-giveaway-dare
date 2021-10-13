import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';

import InfoIcon from '@material-ui/icons/Info';

import TipsModal from './TipsModal';

const Container = styled.button`
  position: absolute;
  height: 100%;
  padding: 0 16px;
  bottom: 0;
  left: 0;

  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: -0.24px;
  color: white;

  display:  flex;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;
    margin-right: 5px;
  }
`;

class TipsButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowingTips: false,
    };

    if (props.appearsAutomatically) {
      setTimeout(() => this.setState({ isShowingTips: true }), 1600);
    }
  }

  render() {
    const { isShowingTips } = this.state;

    return (
      <>
        <Container onClick={() => this.setState({ isShowingTips: true })}>
          <InfoIcon />
          Tips
        </Container>

        <AnimatePresence>
          {isShowingTips && (
            <TipsModal onDismiss={() => this.setState({ isShowingTips: false })} />
          )}
        </AnimatePresence>
      </>
    );
  }
}

TipsButton.propTypes = {
  appearsAutomatically: PropTypes.bool,
};

export default TipsButton;
