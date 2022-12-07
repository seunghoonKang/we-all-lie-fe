import React, { useState, useEffect, useContext } from 'react';
import Timer from '../elements/Timer';
import Camera from '../elements/Camera2';
import GameStartHeader from './gamestart/GameStartHeader';
import GivenWord from './gamestart/GivenWord';
import styled, { ThemeContext } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../shared/socket';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import SelectCategoryImg from './gamestart/SelectCategoryImg';

const GameStart = () => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const userNickname = useSelector((state) => state.room.userNickname);
  const words = useSelector((state) => state.game.words);
  const answerWord = useSelector((state) => state.game.answerWord);
  const category = useSelector((state) => state.game.category);
  const spy = useSelector((state) => state.game.spy);
  const [cookies, setCookies] = useCookies(['nickname']);
  const param = useParams();
  const [earlyVote, setEarlyVote] = useState(false);
  const goFromStartToVote = useSelector(
    (state) => state.game.goFromStartToVote
  );
  const userCameras = [
    { nickName: '빈자리' },
    { nickName: '빈자리' },
    { nickName: '빈자리' },
    { nickName: '빈자리' },
    { nickName: '빈자리' },
    { nickName: '빈자리' },
    { nickName: '빈자리' },
    { nickName: '빈자리' },
  ];
  const fillInTheEmptySeats = () => {
    for (let step = 0; step < 8; step++) {
      if (userCameras[step].nickName === '빈자리') {
        userCameras[step].nickName = userNickname[step];
      }
    }
    return userCameras;
  };
  fillInTheEmptySeats();

  // userCameras[0].nickName = cookies.nickname;

  useEffect(() => {
    socket.emit('setNowVote', param.id);
  }, []);

  console.log(words, answerWord, category, spy);
  console.log(goFromStartToVote);

  /* 시간 다되면 알아서 투표페이지로 이동하기 
  const votePage = () =>
    setTimeout(() => {
      alert('시간이 다 되어 투표페이지로 이동합니다.');
      dispatch(goFromGameStartToGameVote(true));
    }, 10000);

  useEffect(() => {
    votePage();
    return () => {
      clearTimeout(votePage);
    };
  }, []);
  */

  return (
    <div theme={themeContext}>
      <GameStartHeader earlyVote={earlyVote} setEarlyVote={setEarlyVote} />
      <GameEntireContainer>
        <GameCardSection>
          <Question>
            <TimerContainer>
              <TimerDiv>
                <MinWidthTimerDiv>
                  <Timer min="8" />
                </MinWidthTimerDiv>
              </TimerDiv>
            </TimerContainer>
            <div>
              <SelectCategoryImg category={category} width="424" height="197" />
              {/* <CategoryFood /> */}
            </div>
          </Question>
          {spy === cookies.nickname ? (
            <CorrectCard>
              <CorrectAnswer>
                <WhatWords>제시어</WhatWords>
                <AnswerCategoryDiv>{category} / ?</AnswerCategoryDiv>
              </CorrectAnswer>
              <IllustSection>
                {words.map((word) => {
                  return <GivenWord word={word} key={word} />;
                })}
              </IllustSection>
            </CorrectCard>
          ) : (
            <CorrectCard>
              <CorrectAnswer>
                <AnswerCategoryDiv>
                  {category}/{answerWord}
                </AnswerCategoryDiv>
              </CorrectAnswer>
              <IllustSection>
                {words.map((word) => {
                  return <GivenWord word={word} key={word} />;
                })}
              </IllustSection>
            </CorrectCard>
          )}
        </GameCardSection>
        <VideoContainer>
          {userCameras.map((person, i) => (
            <Camera nickname={person.nickName} key={i} />
          ))}
        </VideoContainer>
      </GameEntireContainer>
    </div>
  );
};

const GameEntireContainer = styled.div`
  width: 100%;
  //height: 86vh;
  background-color: #fff;
  border-radius: 0 0 10px 10px;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  min-height: 384px;
  height: 54vh;
  //gap: 16px 16px;
  padding: 16px;
  background-color: white;
  border-radius: 10px;
`;

const GameCardSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
  width: 100%;
  padding-top: 16px;
  margin-bottom: 16px;
  gap: 16px;
`;

const TimerContainer = styled.div`
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
  justify-content: space-between;
  font-weight: 700;
  font-size: 16px;
  width: 100%;
  height: 56px;
  border-radius: 6px 6px 0 0;
  background-color: #f5f5f5;
`;

const WhatWords = styled.div`
  width: 42px;
  height: 20px;
  margin: 0 0 0 27px;
`;

const AnswerCategoryDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 158px;
  height: 38px;
  background-color: ${(props) => props.theme.color.lionBlack};
  color: ${(props) => props.theme.color.white};
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSize.sm};
  border-radius: 6px;
  margin-top: 9px;
  margin-right: 10px;
  margin-bottom: 9px;
`;

const CorrectCard = styled.div`
  width: 26.5rem;
  height: 14.5625rem;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 15px;
  margin-right: 18px;
`;

const Question = styled.div`
  width: 26.5rem;
  height: 14.5625rem;
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  flex-grow: 1;
  margin-top: 15px;
`;

const IllustSection = styled.div`
  width: 100%;
  height: 12.0625rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  gap: 7px;
  padding-bottom: 10px;
  border-radius: 0 0 6px 6px;
`;

export default GameStart;
