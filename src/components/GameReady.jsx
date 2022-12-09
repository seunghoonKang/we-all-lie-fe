import styled from 'styled-components';
import ReadyButton from './gameready/ReadyButton';
import MainHeader from './gameready/MainHeader';
import MediumHeader from './gameready/MediumHeader';
import Camera from '../elements/Camera1';
import { useState, useEffect } from 'react';
import { socket } from '../shared/socket';
import { useParams } from 'react-router-dom';
import {
  gameOperation,
  giveCategory,
  giveSpy,
} from '../redux/modules/gameSlice';
import { ReactComponent as Ready } from '../assets/r_eady.svg';
import { ReactComponent as Prepared } from '../assets/prepared_cat.svg';
import { useSelector, useDispatch } from 'react-redux';
import CommonModal from '../elements/CommonModal';
import { getUserNickname } from '../redux/modules/roomSlice';

const GameReady = () => {
  const [ready, setReady] = useState(false);
  const [trueAlert, setTrueAlert] = useState(false);
  const [pendingReady, setPendingReady] = useState([]);
  const param = useParams();
  const dispatch = useDispatch();
  const initialState = [
    { nickname: '', boolkey: false },
    { nickname: '', boolkey: false },
    { nickname: '', boolkey: false },
    { nickname: '', boolkey: false },
    { nickname: '', boolkey: false },
    { nickname: '', boolkey: false },
    { nickname: '', boolkey: false },
    { nickname: '', boolkey: false },
  ];

  const [userCameras, setUserCameras] = useState(
    initialState
    // { nickname: '', boolkey: false },
    // { nickname: '', boolkey: false },
    // { nickname: '', boolkey: false },
    // { nickname: '', boolkey: false },
    // { nickname: '', boolkey: false },
    // { nickname: '', boolkey: false },
    // { nickname: '', boolkey: false },
    // { nickname: '', boolkey: false },
  );

  const ReadyHandler = () => {
    setReady(!ready);
    socket.emit('ready', param.id, ready);
  };

  //게임레디 확인
  socket.on('ready', (nic, bool) => {
    setPendingReady([{ nickname: nic, boolkey: bool }]);
  });
  console.log(pendingReady);

  //닉네임 변경
  socket.on('userNickname', (userNickname) => {
    console.log('너의 닉은 받아오니?', userNickname);
  });

  const Vacancy = () => {
    console.log(1);
    socket.on('userNickname', (userNickname) => {
      console.log('유저닉', userNickname);
      dispatch(getUserNickname(userNickname));
      setUserCameras(initialState);
      for (let item = 0; item < userNickname.length; item++) {
        if (userCameras[item].nickname !== userNickname[item]) {
          userCameras[item].nickname = userNickname[item];
        }
      }
    });
    return userCameras;
  };
  Vacancy();

  //불값 변경
  const GameReadyBool = () => {
    for (let int = 0; int < 8; int++) {
      if (userCameras[int].nickname === pendingReady[0]?.nickname) {
        userCameras[int].boolkey = pendingReady[0].boolkey;
      }
    }
    return userCameras;
  };
  GameReadyBool();

  const userNickname = useSelector((state) => state.room.userNickname);
  const currentUser = userNickname.length;

  const currentReadyUSer = [
    userCameras[0].boolkey,
    userCameras[1].boolkey,
    userCameras[2].boolkey,
    userCameras[3].boolkey,
    userCameras[4].boolkey,
    userCameras[5].boolkey,
    userCameras[6].boolkey,
    userCameras[7].boolkey,
  ];

  const trueUser = currentReadyUSer.filter((user) => user === true);

  // 현재 접속한 유저와 true인 유저와 같다면 alert창을 띄어야 한다.
  useEffect(() => {
    let timer = setTimeout(() => {
      if (currentUser >= 3 && currentUser === trueUser.length) {
        setTrueAlert(!trueAlert);
        //4명 이상이 준비시 스파이 받아옴 리덕스에 넣기 Agent_융징이 이렇게 들어옴
        socket.on('spyUser', (spyUser) => {
          console.log('이건 스파이', spyUser);
          dispatch(giveSpy(spyUser));
        });

        //4명 이상이 준비시 카테고리 받아옴
        socket.on('gameStart', (gameStart) => {
          console.log('이건 카테고리', gameStart);
          dispatch(giveCategory(gameStart));
        });
      } else if (currentUser > trueUser.length) {
        setTrueAlert(false);
      }
      // dispatch(gameOperation(1));
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [trueUser]);

  const sendCategory = useSelector((state) => state.game.sendCategory);
  console.log('과연 들어왔니?', sendCategory);

  const spy = useSelector((state) => state.game.spy);
  console.log('스파이', spy);

  return (
    <ReadyLayout>
      {trueAlert === true ? (
        <CommonModal
          main="잠시 후 게임이 시작됩니다! "
          sub="카메라 앞에 앉아 게임을 준비해주세요."
          time
        ></CommonModal>
      ) : (
        <></>
      )}
      <MainHeader />
      <MediumHeader />
      <ReadyLayoutSection>
        <ReadyButtonSection>
          <h1>준비 버튼을 클릭하세요 ! </h1>
          <span>모든 플레이어가 준비되면 자동으로 게임이 시작됩니다.</span>
          <ReadyButton>
            <div onClick={ReadyHandler}>{!ready ? '준비완료' : '준비하기'}</div>{' '}
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
