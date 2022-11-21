import { hover } from '@testing-library/user-event/dist/hover';
import React from 'react';
import styled from 'styled-components';
import Button from '../elements/Button';
import Camera from '../elements/Camera';
import Timer from './gamestart/Timer';

const GameStart = () => {
  const voteBtnHandler = () => {
    alert('투표하기 벝은');
  };
  const items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  return (
    <GameEntireContainer>
      <VideoContainer>
        {items.map(() => (
          <Camera />
        ))}
      </VideoContainer>
      <GameCardSection>
        <CorrectCard>
          <p>영화관</p>
        </CorrectCard>
        <Question>
          <div>[게으른 토끼] 가 [말많은 호랑이] 에게 질문합니다.</div>
          <Button
            type={'button'}
            addStyle={{
              backgroundColor: '#2B2B2B',
              borderRadius: '6px',
              width: '113px',
              height: '40px',
              color: '#fff',
            }}
            onClick={voteBtnHandler}
          >
            투표하기
          </Button>
          <Button type={'button'} addStyle={{}} doong>
            테스트
          </Button>
          <TimeRemaining>
            <Timer sec="45" />
          </TimeRemaining>
        </Question>
      </GameCardSection>
    </GameEntireContainer>
  );
};

const GameEntireContainer = styled.div`
  min-width: 848px;
  height: calc(90vh - 60px);
  position: relative;
`;

const VideoContainer = styled.div`
  display: flex;
  height: calc(90vh - 60px);
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 280px 0;
`;

const GameCardSection = styled.section`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CorrectCard = styled.div`
  width: 26.5rem;
  height: 13.75rem;
  background-color: #968282;
  display: flex;
  justify-content: center;
  align-items: end;
`;

const Question = styled.div`
  width: 26.5rem;
  height: 13.75rem;
  background-color: #968282;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
`;

const TimeRemaining = styled.div`
  width: 12.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  margin-top: 5px;
`;

export default GameStart;
