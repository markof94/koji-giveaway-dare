import PropTypes from 'prop-types';
import React from 'react';
import { useSpring, animated } from 'react-spring';
import * as easings from 'd3-ease';

const InterpolatedValue = (props) => {
  const spring = useSpring({
    from: { val: 0 },
    to: { val: props.number },
    config: {
      duration: 2000,
      easing: easings.easeExpOut,
    },
  });

  return (
    <animated.span>
      {spring.val.interpolate((val) => Math.round(val).toLocaleString())}
    </animated.span>
  );
};

InterpolatedValue.propTypes = {
  number: PropTypes.any,
};

export default InterpolatedValue;
