import styled from 'styled-components';
import ReadyButton from './gameready/ReadyButton';
import MainHeader from './gameready/MainHeader';
import MediumHeader from './gameready/MediumHeader';
import Camera from '../elements/Camera1';
import { useState } from 'react';
import { socket } from '../shared/socket';
import { useParams } from 'react-router-dom';
import { gameOperation, giveCategory } from '../redux/modules/gameSlice';
import { ReactComponent as Ready } from '../assets/r_eady.svg';
import { ReactComponent as Prepared } from '../assets/prepared_cat.svg';
import { useSelector, useDispatch } from 'react-redux';

const GameReady = () => {
  const [ready, setReady] = useState(false);
  const [pendingReady, setPendingReady] = useState([]);
  const param = useParams();
  const dispatch = useDispatch();
  const userNickname = useSelector((state) => state.room.userNickname);
  // console.log('받아오는 닉네임 확인', userNickname);
  const giveCategory = useSelector((state) => state.game.giveCategory);
  console.log('과연 들어왔니?', giveCategory);

  const [userCameras, setUserCameras] = useState([
    { nickname: '', boolkey: false },
    { nickname: '', boolkey: false },
    { nickname: '', boolkey: false },
    { nickname: '', boolkey: false },
    { nickname: '', boolkey: false },
    { nickname: '', boolkey: false },
    { nickname: '', boolkey: false },
    { nickname: '', boolkey: false },
  ]);

  const ReadyHandler = () => {
    socket.emit('ready', param.id);
    setReady(!ready);
  };

  //게임레디 확인
  socket.on('ready', (nic, bool) => {
    setPendingReady([
      // ...pendingReady,
      { nickname: nic, boolkey: bool },
    ]);
  });
  // console.log(pendingReady);

  //닉네임 변경
  const Vacancy = () => {
    for (let item = 0; item < userNickname.length; item++) {
      if (userCameras[item].nickname === '') {
        userCameras[item].nickname = userNickname[item];
        // console.log(userCameras[nicItem].nickname);
      }
    }
  };
  // console.log('8개의 배열형태', userCameras);

  Vacancy();

  //불값 변경
  const GameReadyBool = () => {
    for (let int = 0; int < 8; int++) {
      // console.log('카메라 불값', userCameras[int].nickname);
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
    dispatch(giveCategory(gameStart));
    // setTimeout(()=> {
    dispatch(gameOperation(1));
    // },1000)
  });

  return (
    <ReadyLayout>
      <MainHeader />
      <MediumHeader />
      <ReadyLayoutSection>
        <ReadyButtonSection>
          <h1>준비 버튼을 클릭하세요 ! </h1>
          <span>모든 플레이어가 준비되면 자동으로 게임이 시작됩니다.</span>
          <ReadyButton>
            <div onClick={ReadyHandler}>{!ready ? '준비하기' : '준비완료'}</div>{' '}
          </ReadyButton>
        </ReadyButtonSection>
        <Users>
          {userCameras.map((person) =>
            person.boolkey === true ? (
              <ReadyWrap>
                <ReadyMediumWrap>
                  <Ready />
                </ReadyMediumWrap>
                <Prepared />
                <ReadyNickName>{person.nickname}</ReadyNickName>
              </ReadyWrap>
            ) : (
              <Camera person={person.nickname} />
            )
          )}
        </Users>
      </ReadyLayoutSection>
    </ReadyLayout>
  );
};

export default GameReady;

const ReadyLayout = styled.div`
  width: 100%;
  height: 90vh;
  min-height: 650px;
  /* background-color: white; */
  border-radius: 5px;
`;

const ReadyLayoutSection = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  width: 100%;
  padding: 1vh 0.5%;
`;

const ReadyButtonSection = styled.div`
  border: orange;
  min-height: 160px;
  height: 22vh;
  margin: 1vh 1%;
  padding: 2vh 3%;
  background-color: ${(props) => props.theme.color.gray1};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex;
  gap: 2vh;
  h1 {
    font-size: 22px;
    font-weight: 600;
    border: gray;
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
  align-items: center;
`;

const ReadyMediumWrap = styled.div`
  width: 100%;
  height: 3%;
  padding: 5px 0 0 5px;
  /* background-color: orange; */
`;

const ReadyNickName = styled.div`
  width: 100%;
  height: 28px;
  line-height: 28px;
  background-color: #222222;
  color: #f5f5f5;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  border-radius: 0px 0px 5px 5px;
  margin: 5% 0 0 0;
`;
