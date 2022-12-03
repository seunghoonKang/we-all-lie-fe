import styled from 'styled-components';
import ReadyButton from './gameready/ReadyButton';
import ReadyHeader from './gameready/ReadyHeader';
import HeaderSection from './gameready/HeaderSection';
import Camera from '../elements/Camera1';
import { useState } from 'react';
import { ReactComponent as Ready } from '../assets/r_eady.svg';
import { useParams } from 'react-router-dom';
import { socket } from '../shared/socket';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';

const GameReady = () => {
  const [ready, useReady] = useState(false);
  const [pendingReady, setPendingReady] = useState([]);
  const param = useParams();
  const [cookies] = useCookies(['nickname']);

  const userNickname = useSelector((state) => state.room.userNickname);
  console.log('받아오는 닉네임 확인', userNickname);

  const ReadyHandler = () => {
    socket.emit('ready', param.id);
    useReady(!ready);
  };

  //게임레디 확인
  socket.on('ready', (nic, bool) => {
    setPendingReady([
      ...pendingReady,
      { nickname: `${nic}`, boolkey: `${bool}` },
    ]);
  });
  console.log(pendingReady);

  let userCameras = [
    '빈자리',
    '빈자리',
    '빈자리',
    '빈자리',
    '빈자리',
    '빈자리',
    '빈자리',
    '빈자리',
  ];

  //입장하는 유저들
  const ha = () => {
    for (let step = 0; step < userNickname.length; step++) {
      if (userCameras[step] === '빈자리') {
        userCameras[step] = userNickname[step];
      }
    }
    return userCameras;
  };
  ha();
  console.log('8개의 배열형태', userCameras);

  //4명 이상이 준비시 카테고리 받아옴
  socket.on('gameStart', (gameStart) => {
    console.log('게임시작됐는지 확인', gameStart);
  });

  return (
    <ReadyLayout>
      <div>
        <ReadyHeader />
        <HeaderSection />

        <ReadyButtonSection>
          <h1>준비 버튼을 클릭하세요 ! </h1>
          <span>모든 플레이어가 준비되면 자동으로 게임이 시작됩니다.</span>
          <div onClick={ReadyHandler}>
            <ReadyButton>준비완료 </ReadyButton>
          </div>
        </ReadyButtonSection>
      </div>
      <Users
      // userLength={userLength}
      >
        {/* 두번째 방법  */}

        {/* {pendingReady.map((person, i) =>
          !ready ? (
            <Camera person={person.nickname} key={i} />
          ) : (
            <ReadyWrap>
              <Ready />
              <ReadyNickName>{person.nickname}</ReadyNickName>
            </ReadyWrap>
          )
        )} */}

        {/* 세번쨰 방법 */}
        {userCameras.map((person, i) =>
          !ready ? (
            <Camera person={person} key={i} />
          ) : pendingReady.nickname === cookies.nickname ||
            pendingReady.boolkey === 'true' ? (
            <ReadyWrap person={person} key={i}>
              <Ready />
              <ReadyNickName>{person}</ReadyNickName>
            </ReadyWrap>
          ) : (
            <Camera person={person} key={i} />
          )
        )}
      </Users>
    </ReadyLayout>
  );
};

export default GameReady;

const ReadyLayout = styled.div`
  width: 100%;
  //height: 100%;
  height: 90vh;
  min-height: 650px;
  background-color: white;
  border-radius: 5px;
`;

const ReadyButtonSection = styled.div`
  /* background-color: #4f9c64; */
  min-height: 160px;
  height: 22vh;
  margin: 1vh 1.5%;
  padding: 2vh 3%;
  //background-color: #f5f5f5;
  background-color: ${(props) => props.theme.color.gray1};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  //margin: 2vh auto; //50px auto 에서 변경
  align-items: flex;
  /* gap: 10px; */
  gap: 2vh;
  h1 {
    /* background-color: white; */
    font-size: 22px;
    font-weight: 700;
  }
  span {
    /* background-color: pink; */
    font-size: 16px;
    color: #2b2b2b;
    margin: 0px 0px 1vh; //27px -> 20px
  }
`;

const Users = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly; //가로 띄우기
  align-content: space-evenly; //세로 띄우기
  width: 100%;
  height: 50vh;
  min-height: 312px;
`;

const ReadyWrap = styled.div`
  width: 24%;
  height: 45%;
  background-color: #e8e8e8;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  img {
    align-self: flex-start;
    /* margin: 5px; */
  }
`;

const ReadyNickName = styled.div`
  width: 100%;
  height: 28px;
  background-color: #222222;
  color: white;
  align-self: flex-end;
  text-align: center;
  border-radius: 0px 0px 5px 5px;
`;
