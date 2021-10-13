import styled from 'styled-components';
import { animateOnTap, cursorPointer } from '../resources/util/styles';

const StandardButton = styled.div`
  position: relative;
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #007AFF;
  border-radius: 50px;
  font-weight: 500;
  font-size: 17px;
  line-height: 16px;
  text-align: center;
  letter-spacing: -0.14px;
  color: #FFFFFF;
  transition: transform 0.1s ease;
  user-select: none;

  ${({ rounded }) => rounded && `
    border-radius: 100px;
  `}

  ${({ invert }) => invert && `
    background-color: #FFFFFF;
    color: #007AFF;
    border: 1px solid #E5E5E5;
  `}

  ${({ secondary }) => secondary && `
    background-color: #F2F2F2;
    color: #007AFF;
  `}

  ${({ disabled }) => disabled && `
    opacity: 0.5;
    pointer-events: none;
  `}

  ${cursorPointer}
  ${animateOnTap}
`;

export default StandardButton;
