import React from 'react';
import styled, { css } from 'styled-components';

const Button = ({ children, ...props }) => {
  return (
    <>
      {children === '투표준비' ? (
        <StyledButton
          type={props.type}
          onClick={props.onClick}
          addStyle={props.addStyle}
          doong={props.doong}
          disabled={props.disabled}
        >
          {children}
        </StyledButton>
      ) : (
        <StyledButton
          type={props.type}
          onClick={props.onClick}
          addStyle={props.addStyle}
          doong={props.doong}
        >
          {children}
        </StyledButton>
      )}
      {/* <StyledButton
        type={props.type}
        onClick={props.onClick}
        addStyle={props.addStyle}
        doong={props.doong}
      >
        {children}
      </StyledButton> */}
    </>
  );
};

const StyledButton = styled.button`
  width: ${(props) => props?.addStyle.width || '96px'};
  height: ${(props) => props?.addStyle.height || '40px'};
  background-color: ${(props) => props?.addStyle.backgroundColor || '#fff'};
  border-radius: ${(props) => props?.addStyle.borderRadius || '6px'};
  color: ${(props) => props?.addStyle.color || '#1F1F1F'};
  &:hover {
    transition: 0.3s ease-in-out;
    background-color: #ff8217;
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

  ${(props) =>
    props.disabled &&
    css`
      :disabled ;
      background-color: gray;
      &:hover {
        transition: 0.3s ease-in-out;
        background-color: red;
      }
      &:not(:hover) {
        transition: 0.3s ease-out;
      }
    `}
`;

export default Button;
