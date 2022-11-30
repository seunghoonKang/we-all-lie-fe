import styled from 'styled-components';
import ReadyButton from './gameready/ReadyButton';
import ReadyHeader from './gameready/ReadyHeader';
import HeaderSection from './gameready/HeaderSection';
import Camera from '../elements/Camera';
import { useState, useEffect } from 'react';
import { ReactComponent as Ready } from '../assets/r_eady.svg';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { socket } from '../shared/socket';

const GameReady = () => {
  const [ready, useReady] = useState(false);
  const initialState = [
    // {
    //   nickname: '',
    //   boolkey: '',
    // },
  ];
  const [pendingReady, setPendingReady] = useState(initialState);
  const [cookies, setCookies] = useCookies(['nickname']);
  const param = useParams();

  //방번호를 주면 소켓에 닉네임 들어있음 레디를 안누른 사람이 눌렀을때
  //레디 버튼 누른 사람 닉네임
  //어떤 닉네임을 가진 사람이 true 값으로 바꾼것만 보내면 될듯
  const ReadyHendler = () => {
    socket.emit('ready', param.id);
    useReady(!ready);
  };

  socket.on('ready', (nic, bool) => {
    setPendingReady([
      ...pendingReady,
      { nickname: `${nic}`, boolkey: `${bool}` },
    ]);
    console.log('받아오는 pendingReady 값 확인', pendingReady);
  });

  // 가설 1 : 받아오는 닉네임 정보를 맵 돌린다.
  // pendingReady.map(personReady, i);
  const userCameras = [
    { nickName: cookies.nickname },
    { nickName: 'b' },
    { nickName: 'c' },
    { nickName: 'd' },
    { nickName: 'e' },
    { nickName: 'f' },
    { nickName: 'g' },
    { nickName: 'h' },
  ];
  const userLength = userCameras.length;

  socket.on('gameStart', (gameStart) => {
    console.log('게임시작됐는지 확인', gameStart);
  });

  return (
    <ReadyLayout>
      <div
        style={{
          height: '40vh',
          minHeight: '280px',
          //  min-height: 280px;
          //height: 40vh;
        }}
      >
        <ReadyHeader />
        <HeaderSection />

        <ReadyButtonSection>
          <h1>준비 버튼을 클릭하세요 ! </h1>
          <span>모든 플레이어가 준비되면 자동으로 게임이 시작됩니다.</span>
          <div onClick={ReadyHendler}>
            <ReadyButton>준비완료 </ReadyButton>
          </div>
        </ReadyButtonSection>
      </div>
      <Users userLength={userLength}>
        {userCameras.map((person) =>
          !ready ? (
            <Camera person={person.nickName} key={person.nickName} />
          ) : cookies.nickname === person.nickName ? (
            <ReadyWrap>
              {/* <img
                // style={{ transform: 'scale(0.3)' }}
                src="/img/ready.png"
              ></img> */}
              <Ready />
              <ReadyNickName>{person.nickName}</ReadyNickName>
            </ReadyWrap>
          ) : (
            <Camera person={person.nickName} key={person.nickName} />
          )
        )}
      </Users>
    </ReadyLayout>
  );
};

export default GameReady;

const ReadyLayout = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 5px;
`;

const ReadyButtonSection = styled.div`
  /* background-color: #4f9c64; */
  margin: 1.5%;
  padding: 3%;
  background-color: #f5f5f5;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  //margin: 2vh auto; //50px auto 에서 변경
  align-items: flex-start;
  gap: 10px;
  h1 {
    /* background-color: white; */
    font-size: 22px;
    font-weight: 700;
  }
  span {
    /* background-color: pink; */
    font-size: 16px;
    color: #2b2b2b;
    margin: 0px 0px 10px; //27px -> 20px
  }
`;

const RoomNameLayout = styled.div`
  background-color: #cfcfcf;
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const RoomNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: #ffffff;
  align-content: center;
  min-width: 6%;
  min-height: 40px;
  border-radius: 5px;
  text-align: center;
  font-size: 20px;
  margin: 0 auto 10px;
`;

const RoomInitials = styled.div`
  display: flex;
  align-items: center;
  background-color: #222222;
  color: #ffffff;
  width: 90%;
  min-height: 40px;
  border-radius: 5px;
  font-size: 20px;
  padding-left: 5px;
  margin: 0 auto 10px;
`;

const Users = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  gap: 16px 16px;
  border-radius: 5px;
  padding: 16px;
  background-color: white;
  min-height: 384px;
  height: 50vh;
`;

const ReadyWrap = styled.div`
  width: 204px;
  height: 164px;
  background-color: #e8e8e8;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  img {
    align-self: flex-start;
    margin: 5px;
  }
`;

const ReadyNickName = styled.div`
  width: 202px;
  height: 28px;
  background-color: #222222;
  color: white;
  align-self: flex-end;
  text-align: center;
  border-radius: 0px 0px 5px 5px;
`;
