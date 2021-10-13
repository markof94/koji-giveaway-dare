import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import { timestampFromSeconds } from 'resources/helpers/timestampFromSeconds';

const Container = styled.div`
  position: absolute;
  z-index: 9;
  left: 0;
  top: 0;
  width: 100%;
`;

const Track = styled(motion.div)`
  position: absolute;
  top: -3px;
  left: 0;
  width: 100%;
  height: 3px;
  mask-image: -webkit-radial-gradient(white, black);
`;

const Inner = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 3px;
  background: #f44336;
`;

const RemainingTimeLabel = styled.div`
  width: 100%;
  text-align: center;
  padding: 0 20px;
  color: white;
  font-size: 14px;
  line-height: 18px;
  font-weight: 500;
  margin-top: -26px;
  text-shadow: 0px 0px 6px black;
`;

class ProgressBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      timeElapsed: 0,
    };

    this.startTime = Date.now();
    this.timeoutInterval = setInterval(() => this.setState({
      timeElapsed: Math.floor((Date.now() - this.startTime) / 1000),
    }));
  }

  componentWillUnmount() {
    clearInterval(this.timeoutInterval);
  }

  render() {
    const { maxDuration } = this.props;
    const { timeElapsed } = this.state;

    let timestamp = timestampFromSeconds(timeElapsed);
    if (maxDuration) {
      timestamp = timestampFromSeconds(maxDuration - timeElapsed);
    }

    return (
      <Container>
        {maxDuration && (
          <Track>
            <Inner
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              transition={{
                duration: maxDuration,
                ease: 'linear',
              }}
            />
          </Track>
        )}
        <RemainingTimeLabel>
          {timestamp}
        </RemainingTimeLabel>
      </Container>
    );
  }
}

ProgressBar.propTypes = {
  maxDuration: PropTypes.number,
};

export default ProgressBar;
