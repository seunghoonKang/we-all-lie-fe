import React, { useState, useEffect, useMemo } from 'react';
import { socket } from '../shared/socket';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { gameOperation } from '../redux/modules/gameSlice';
import Camera from '../elements/Camera2';
import GameStartHeader from './gamestart/GameStartHeader';
import styled from 'styled-components';
import SelectCategoryImg from './gamestart/SelectCategoryImg';
import CorrectCardSection from './gamestart/CorrectCardSection';
import GameStartTimerSection from './gamestart/GameStartTimerSection';
import CommonModal from '../elements/CommonModal';
import { getUserNickname } from '../redux/modules/roomSlice';

const GameStart = () => {
  const dispatch = useDispatch();
  // const userNickname = useSelector((state) => state.room.userNickname);
  // const category = useSelector((state) => state.game.category);
  const category = useSelector((state) => state.game.sendCategory.category);
  const [modalStatus, setModalStatus] = useState(false);
  const [earlyVote, setEarlyVote] = useState(false);
  const param = useParams();
  const totalTime = 30000;

  let initialState = [];
  const [userCameras, setUserCameras] = useState(initialState);

  // const fillInTheEmptySeats = useMemo(() => {
  //   socket.emit('userNickname', param.id);
  //   socket.on('userNickname', (user) => {
  //     console.log(user);
  //     setUserCameras(initialState);
  //     for (let i = 0; i < user.length; i++) {
  //       if (userCameras[i].nickname !== user[i]) {
  //         userCameras[i].nickname = user[i];
  //       }
  //     }
  //     dispatch(getUserNickname(userCameras));
  //     return userCameras;
  //   });
  // }, [userCameras]);

  // useEffect(() => {
  //   socket.emit('userNickname', param.id);
  //   socket.on('userNickname', (user) => {
  //     console.log(user);
  //     setUserCameras(initialState);
  //     for (let i = 0; i < user.length; i++) {
  //       if (userCameras[i].nickname !== user[i]) {
  //         let newuserCameras = [...userCameras];
  //         newuserCameras[i].nickname = user[i];
  //         setUserCameras(newuserCameras);
  //         // userCameras[i].nickname = user[i];
  //       }
  //     }
  //     dispatch(getUserNickname(userCameras));
  //     return userCameras;
  //   });
  // }, []);

  useEffect(() => {
    socket.emit('userNickname', param.id);
    socket.on('userNickname', (user) => {
      setUserCameras([...user]);
      return userCameras;
    });
  }, []);

  /* 시간되면 모달 띄우기 7분으로 따라가기 */
  const votePage = () => {
    setTimeout(() => {
      setModalStatus(true);
    }, totalTime);
  };

  //시간 다되면 알아서 투표페이지로 이동하기
  //모달창 이후에 dispatch가 돼야 해서
  //모달창 이후 7초 추가함
  const changeGameOperation = () => {
    setTimeout(() => {
      setModalStatus(false);
      if (gameOperation === 2 || 3) {
        return;
      } else {
        dispatch(gameOperation(2));
      }
    }, totalTime + 7000);
  };

  useEffect(() => {
    votePage();
    changeGameOperation();
    return () => {
      clearTimeout(votePage);
      clearTimeout(changeGameOperation);
    };
  }, []);

  return (
    <>
      {modalStatus && (
        <CommonModal
          main="잠시 후 투표가 시작됩니다. "
          sub="시간이 다 되어 투표페이지로 이동합니다."
          time
        />
      )}
      <GameStartHeader earlyVote={earlyVote} setEarlyVote={setEarlyVote} />
      <GameEntireContainer>
        <GameCardSection>
          <Question>
            <GameStartTimerSection />
            <CategoryImgDiv>
              <SelectCategoryImg category={category} width="424" height="197" />
            </CategoryImgDiv>
          </Question>
          <CorrectCardSection />
        </GameCardSection>
        <VideoContainer>
          {userCameras.map((person, i) => (
            <Camera person={person} key={i} />
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

const CategoryImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Question = styled.div`
  width: 30vw;
  height: 14.5625rem;
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  flex-grow: 1;
  margin-top: 15px;
`;

export default GameStart;
