import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Camera3 from '../../elements/Camera3';
import SelectCategoryImg from '../gamestart/SelectCategoryImg';
import { socket } from '../../shared/socket';

const GameEndContents = () => {
  const answerWord = useSelector((state) => state.game.sendCategory.answerWord);
  const category = useSelector((state) => state.game.sendCategory.category);
  const spy = useSelector((state) => state.game.spy);
  let userNickname = useSelector((state) => state.room.userNickname);
  console.log(spy);
  const initialState = ['', '', '', '', '', '', '', ''];
  const [userCameras, setUserCameras] = useState(initialState);
  const param = useParams();

  //스파이 빼고 나머지 유저들 고르기
  // const exceptSpy = () => {
  //   return (userNickname = userNickname.filter(
  //     (nick) => nick.nickname !== spy
  //   ));
  // };
  // exceptSpy();

  // let userCameras = [
  //   { nickName: '빈자리', id: 1 },
  //   { nickName: '빈자리', id: 2 },
  //   { nickName: '빈자리', id: 3 },
  //   { nickName: '빈자리', id: 4 },
  //   { nickName: '빈자리', id: 5 },
  //   { nickName: '빈자리', id: 6 },
  //   { nickName: '빈자리', id: 7 },
  // ];

  //스파이 외 나머지 유저들 자리  채우기
  // const fillInTheEmptySeats = () => {
  //   for (let i = 0; i < userCameras.length; i++) {
  //     if (
  //       userNickname[i].nickname !== '' &&
  //       userCameras[i].nickName === '빈자리'
  //     ) {
  //       userCameras[i].nickName = userNickname[i].nickname;
  //     }
  //   }
  //   return userCameras;
  // };
  // fillInTheEmptySeats();

  //뀨띠가 임의로 해봄
  useEffect(() => {
    // const spreadPeople = () => {
    socket.emit('userNickname', param.id);
    socket.on('userNickname', (user) => {
      console.log(user);
      setUserCameras([...user]);
      return userCameras;
    });
  }, []);

  console.log('GameEndContents userCameras ::', userCameras);

  return (
    <GameEndEntireContainer>
      <GameCardSection>
        <CategoryImg>
          <div>
            <AnswerCategoryDiv>
              {category} / {answerWord}
            </AnswerCategoryDiv>
          </div>
          <SelectCategoryImg category={category} width="513" height="238" />
        </CategoryImg>
        <CorrectCard>
          <div></div>
          <SpyName>{spy}</SpyName>
        </CorrectCard>
      </GameCardSection>
      <EndGameCameraEntireDiv>
        {userCameras.map(
          (person, i) => person !== spy && <Camera3 nickname={person} key={i} />
        )}
      </EndGameCameraEntireDiv>
    </GameEndEntireContainer>
  );
};

const GameEndEntireContainer = styled.div`
  width: 100%;
  min-height: 570px;
  height: calc(90vh - 100px);
  background-color: ${(props) => props.theme.color.gray3};
`;

const GameCardSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 380px;
  height: 53vh;
  width: 100%;
  gap: 16px;
`;

const AnswerCategoryDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 158px;
  height: 40px;
  background-color: ${(props) => props.theme.color.lionBlack};
  color: ${(props) => props.theme.color.white};
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSize.sm};
  border-radius: 6px;
  margin-top: 9px;
  margin-right: 10px;
  margin-bottom: 33px;
`;

const CategoryImg = styled.div`
  width: 50vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin-left: 16px;
  background-color: ${(props) => props.theme.color.gray1};
  border-radius: 6px;
`;

const CorrectCard = styled.div`
  position: relative;
  width: 50vw;
  height: 50vh;
  background-color: ${(props) => props.theme.color.gray1};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-right: 18px;
`;

const SpyName = styled.div`
  position: absolute;
  top: 43vh;
  left: 16px;
  width: 12rem;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.lionOrange};
  border-radius: 6px;
`;

const EndGameCameraEntireDiv = styled.div`
  width: 100%;
  min-height: 170px;
  height: calc(30vh - 60px);
  margin: auto;
  display: flex;
  justify-content: center;
  gap: 13px;
  padding-left: 16px;
  padding-right: 16px;
`;

export default GameEndContents;
