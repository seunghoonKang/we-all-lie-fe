import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Camera from '../elements/Camera2';
import { socket } from '../shared/socket';
import Timer from '../elements/Timer';
import GameStartHeader from './gamestart/GameStartHeader';

const GameStart = () => {
  const userCameras = [
    { nickName: '승훈' },
    { nickName: '연석' },
    { nickName: '진영' },
    { nickName: '형석' },
    { nickName: '민형' },
    { nickName: '하은' },
    { nickName: '윤진' },
    { nickName: '주은' },
  ];

  const words = useSelector((state) => state.game.words);
  const answerWord = useSelector((state) => state.game.answerWord);
  const category = useSelector((state) => state.game.category);
  const spy = useSelector((state) => state.game.spy);

  console.log(words, answerWord, category, spy);

  return (
    <>
      <GameStartHeader />
      {userCameras.map((person) => (
        <GameEntireContainer key={person.nickName}>
          <GameCardSection>
            <Question>
              <TimerContainer>
                <TimerDiv>
                  <MinWidthTimerDiv>
                    <Timer min="8" />
                  </MinWidthTimerDiv>
                </TimerDiv>
              </TimerContainer>
              <div className="mt-[77px] pl-[37px]">
                <div>
                  <p className=" font-semibold text-[22px]">
                    질문할 차례입니다!
                  </p>
                </div>
                <div>
                  <p>질문하고 싶은 유저의 화면을 클릭하세요.</p>
                </div>
              </div>
            </Question>
            {spy === person.nickName ? (
              <CorrectCard>
                <CorrectAnswer>
                  <p>비밀임</p>
                </CorrectAnswer>
                <IllustSection>
                  <p>{category}</p>
                </IllustSection>
              </CorrectCard>
            ) : (
              <CorrectCard>
                <CorrectAnswer>
                  <p>{answerWord}</p>
                </CorrectAnswer>
                <IllustSection>
                  <p>{category}</p>
                </IllustSection>
              </CorrectCard>
            )}
          </GameCardSection>
          <VideoContainer>
            <Camera nickname={person.nickName} />
          </VideoContainer>
        </GameEntireContainer>
      ))}
    </>
  );
};

const GameEntireContainer = styled.div`
  width: 100%;
  height: 86vh;
  background-color: #fff;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  min-height: 384px;
  height: 50vh;
  gap: 16px 16px;
  padding: 16px;
  background-color: white;
  border-radius: 10px;
`;

const GameCardSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
  gap: 16px;
`;

const TimerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 6px;
  background-color: #f5f5f5;
`;

const TimerDiv = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  width: 80%;
  height: 40px;
  border-radius: 6px;
  color: #fff;
  background-color: #222;
  animation-name: progressTimeBar;
  animation-duration: 10s;
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

const CorrectAnswer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  width: 100%;
  height: 40px;
  border-radius: 6px 6px 0 0;
  background-color: #f5f5f5;
`;

const CorrectCard = styled.div`
  width: 26.5rem;
  height: 14.5625rem;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-top: 15px;
  padding-right: 18px;
`;

const Question = styled.div`
  width: 26.5rem;
  height: 14.5625rem;
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  flex-grow: 1;
  padding-top: 15px;
`;

const IllustSection = styled.div`
  width: 100%;
  height: 12.0625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dfdfdf;
`;

export default GameStart;
