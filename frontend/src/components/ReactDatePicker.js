import React from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { withStyles } from '@material-ui/styles';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MomentUtils from '@date-io/moment';

const Container = styled.div`
  position: relative;
`;

const CalendarIcon = () => (
  <svg
    width="26"
    height="25"
    viewBox="0 0 26 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.89489 11.438H7.87327V13.438H9.89489V11.438ZM13.9381 11.438H11.9165V13.438H13.9381V11.438ZM17.9814 11.438H15.9598V13.438H17.9814V11.438ZM20.003 4.43799H18.9922V2.43799H16.9706V4.43799H8.88408V2.43799H6.86245V4.43799H5.85164C4.72964 4.43799 3.84013 5.33799 3.84013 6.43799L3.83002 20.438C3.83002 21.538 4.72964 22.438 5.85164 22.438H20.003C21.1149 22.438 22.0246 21.538 22.0246 20.438V6.43799C22.0246 5.33799 21.1149 4.43799 20.003 4.43799ZM20.003 20.438H5.85164V9.43799H20.003V20.438Z"
      fill="currentColor"
    />
  </svg>
);

const IconContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding-top: 14px;
  padding-right: 10px;
  z-index: 1;

  > svg {
    color: #757575;
  }

  ${(props) =>
    props.isInvalid &&
    `
      > svg {
        color: red;
      }
  `}
`;

const StyledDatePicker = withStyles({
  root: {
    width: '100%',
    background: 'transparent',
    border: (props) =>
      props.isInvalid ? '1px solid red' : '1px solid #999999',
    borderRadius: '10px',
    outline: 'none',
    fontSize: '17px',
    lineHeight: '21px',
    padding: '12px',
    height: '57px',
    zIndex: '2',

    '& .MuiFormHelperText-root.Mui-error': {
      marginTop: '17px',
    },

    '& .MuiInputBase-root': {
      color: (props) => (props.isInvalid ? 'red' : '#000'),
    },
  },
})(DatePicker);

const ReactDatePicker = (props) => (
  <Container>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <StyledDatePicker
        format="LL"
        animateYearScrolling
        clearable
        InputProps={{ disableUnderline: true }}
        {...props}
      />
    </MuiPickersUtilsProvider>

    <IconContainer isInvalid={props.isInvalid}>
      <CalendarIcon />
    </IconContainer>
  </Container>
);

ReactDatePicker.propTypes = {
  isInvalid: PropTypes.bool,
};

export default ReactDatePicker;
