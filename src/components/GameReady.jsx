import styled from 'styled-components';
import ReadyButton from './gameready/ReadyButton';
import ReadyHeader from './gameready/ReadyHeader';
import HeaderSection from './gameready/HeaderSection';
import Camera from '../elements/Camera1';
import { useState, useEffect } from 'react';
import { ReactComponent as Ready } from '../assets/r_eady.svg';
import { useParams } from 'react-router-dom';
import { socket } from '../shared/socket';
import { useSelector } from 'react-redux';

const GameReady = () => {
  const [ready, useReady] = useState(false);
  const [pendingReady, setPendingReady] = useState([
    { nickname: '빈자리', boolkey: false },
    { nickname: '빈자리', boolkey: false },
    { nickname: '빈자리', boolkey: false },
    { nickname: '빈자리', boolkey: false },
    { nickname: '빈자리', boolkey: false },
    { nickname: '빈자리', boolkey: false },
    { nickname: '빈자리', boolkey: false },
    { nickname: '빈자리', boolkey: false },
  ]);
  const param = useParams();
  const userNickname = useSelector((state) => state.room.userNickname);
  // console.log('받아오는 닉네임 확인', userNickname);
  const [userCameras, setUserCameras] = useState([
    { nickname: '빈자리', boolkey: false },
    { nickname: '빈자리', boolkey: false },
    { nickname: '빈자리', boolkey: false },
    { nickname: '빈자리', boolkey: false },
    { nickname: '빈자리', boolkey: false },
    { nickname: '빈자리', boolkey: false },
    { nickname: '빈자리', boolkey: false },
    { nickname: '빈자리', boolkey: false },
  ]);

  const ReadyHandler = () => {
    socket.emit('ready', param.id);
    useReady(!ready);
    socket.on('ready', (nic, bool) => {
      console.log(nic, bool);
      // setPendingReady([
      //   // ...pendingReady,
      //   { nickname: `${nic}`, boolkey: `${bool}` },
      // ]);
      for (let int = 0; int < userNickname.length; int++) {
        if (pendingReady[int].nickname === nic) {
          setPendingReady([
            ...pendingReady,
            (pendingReady[int].boolkey = bool),
          ]);
        }
      }
      //return userCameras;
    });
  };

  //게임레디 확인
  socket.on('ready', (nic, bool) => {
    setPendingReady([
      // ...pendingReady,
      { nickname: nic, boolkey: bool },
    ]);
  });
  console.log(pendingReady);
  console.log(pendingReady[0]);
  // 닉네임 변경
  // useEffect(() => {
  //   Vacancy();
  // });

  // let userCameras = [
  //   { nickname: '빈자리', boolkey: false },
  //   { nickname: '빈자리', boolkey: false },
  //   { nickname: '빈자리', boolkey: false },
  //   { nickname: '빈자리', boolkey: false },
  //   { nickname: '빈자리', boolkey: false },
  //   { nickname: '빈자리', boolkey: false },
  //   { nickname: '빈자리', boolkey: false },
  //   { nickname: '빈자리', boolkey: false },
  // ];

  //닉네임 변경
  const Vacancy = () => {
    for (let item = 0; item < userNickname.length; item++) {
      if (userCameras[item].nickname === '빈자리') {
        userCameras[item].nickname = userNickname[item];
        // console.log(userCameras[nicItem].nickname);
      }
    }
  };
  console.log('8개의 배열형태', userCameras);

  Vacancy();

  //불값 변경
  const GameReadyBool = () => {
    for (let int = 0; int < 8; int++) {
      console.log('카메라 불값', userCameras[int].nickname);
      // console.log('팬딩 불값', pendingReady[int].nickname);

      if (userCameras[int].nickname === pendingReady[0]?.nickname) {
        userCameras[int].boolkey = pendingReady[0].boolkey;
      }
    }

    return userCameras;
  };
  console.log('과연 불 값 변경?', userCameras);

  GameReadyBool();

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
      <Users>
        {userCameras.map((person, i) =>
          person.boolkey === true ? (
            <ReadyWrap>
              <Ready />
              <ReadyNickName>{person.nickname}</ReadyNickName>
            </ReadyWrap>
          ) : (
            <Camera person={person.nickname} key={i} />
          )
        )}
      </Users>
    </ReadyLayout>
  );
};

export default GameReady;

const ReadyLayout = styled.div`
  width: 100%;
  height: 90vh;
  min-height: 650px;
  background-color: white;
  border-radius: 5px;
`;

const ReadyButtonSection = styled.div`
  min-height: 160px;
  height: 22vh;
  margin: 1vh 1.5%;
  padding: 2vh 3%;
  background-color: ${(props) => props.theme.color.gray1};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex;
  gap: 2vh;
  h1 {
    font-size: 22px;
    font-weight: 700;
  }
  span {
    font-size: 16px;
    color: #2b2b2b;
    margin: 0px 0px 1vh;
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
