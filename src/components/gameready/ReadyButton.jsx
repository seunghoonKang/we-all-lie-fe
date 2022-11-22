import React from 'react';
import styled, { css } from 'styled-components';

const ReadyButton = ({ children }) => {
  return (
    <>
      <StyledButton>{children}</StyledButton>
    </>
  );
};

export default ReadyButton;

const StyledButton = styled.button`
  width: 200px;
  height: 40px;
  background-color: #ff8217;
  border-radius: 6px;
  color: #1f1f1f;
  font-weight: 500;
  &:hover {
    transition: 0.3s ease-in-out;
    background-color: #1f1f1f;
    color: #ffffff;
  }
  &:not(:hover) {
    transition: 0.3s ease-out;
  }

  ${(props) =>
    props.doong &&
    css`
      animation: doongdoong 1.5s infinite linear;
     @keyframes doongdoong{
    0%,100%{
        transform:translate(0%,0%);
    }
    50%{
        transform:translate(0%,-10%);
    }
    `}
`;
