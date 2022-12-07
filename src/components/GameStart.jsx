import React, { useState, useEffect, useContext } from 'react';
import Timer from '../elements/Timer';
import Camera from '../elements/Camera2';
import GameStartHeader from './gamestart/GameStartHeader';
import GivenWord from './gamestart/GivenWord';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../shared/socket';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import SelectCategoryImg from './gamestart/SelectCategoryImg';
import CorrectCardSection from './gamestart/CorrectCardSection';
import GameStartTimerSection from './gamestart/GameStartTimerSection';

const GameStart = () => {
  const dispatch = useDispatch();
  const userNickname = useSelector((state) => state.room.userNickname);
  const words = useSelector((state) => state.game.words);
  const answerWord = useSelector((state) => state.game.answerWord);
  const category = useSelector((state) => state.game.category);
  const spy = useSelector((state) => state.game.spy);
  const [cookies] = useCookies(['nickname']);
  const [earlyVote, setEarlyVote] = useState(false);
  const param = useParams();

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

  useEffect(() => {
    socket.emit('setNowVote', param.id);
  }, []);

  console.log(words, answerWord, category, spy);

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
    <>
      <GameStartHeader earlyVote={earlyVote} setEarlyVote={setEarlyVote} />
      <GameEntireContainer>
        <GameCardSection>
          <Question>
            <GameStartTimerSection />
            <SelectCategoryImg category={category} width="424" height="197" />
          </Question>
          <CorrectCardSection />
        </GameCardSection>
        <VideoContainer>
          {userCameras.map((person, i) => (
            <Camera nickname={person.nickName} key={i} />
          ))}
        </VideoContainer>
      </GameEntireContainer>
    </>
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

const Question = styled.div`
  width: 26.5rem;
  height: 14.5625rem;
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  flex-grow: 1;
  margin-top: 15px;
`;

export default GameStart;
