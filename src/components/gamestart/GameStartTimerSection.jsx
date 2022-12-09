import React from 'react';
import Timer from '../../elements/Timer';
import styled from 'styled-components';

const GameStartTimerSection = () => {
  return (
    <TimerContainer>
      <TimerDiv>
        <MinWidthTimerDiv>
          <Timer min="7" />
        </MinWidthTimerDiv>
      </TimerDiv>
    </TimerContainer>
  );
};

const TimerContainer = styled.section`
  position: relative;
  width: 100%;
  min-height: 2.5rem;
  border-radius: 6px;
  background-color: #f5f5f5;
`;

const TimerDiv = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  width: 80%;
  height: 2.5rem;
  border-radius: 6px;
  color: #fff;
  background-color: #222;
  animation-name: progressTimeBar;
  animation-duration: 420s;
  animation-iteration-count: 1;
  animation-direction: reverse;
  animation-timing-function: linear;
  animation-fill-mode: forwards;

  @keyframes progressTimeBar {
    0% {
      width: 0%;
      color: #222;
      background-color: orange;
    }

    10% {
      background-color: orange;
    }

    20% {
      background-color: #222;
    }
    100% {
      width: 100%;
      background-color: #222;
    }
  }
`;

const MinWidthTimerDiv = styled.div`
  min-width: 70px;
  margin-left: 37px;
`;

export default GameStartTimerSection;
