import styled from 'styled-components';
import ReadyButton from './gameready/ReadyButton';
import MainHeader from './gameready/MainHeader';
import MediumHeader from './gameready/MediumHeader';
import Camera from '../elements/Camera1';
import Button from '../elements/Button';
import GameEnd from './GameEnd';
import GameStart from './GameStart';
import GameVote from './GameVote';
import { useState, useEffect } from 'react';
import { socket } from '../shared/socket';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as Ready } from '../assets/r_eady.svg';
import { ReactComponent as Prepared } from '../assets/prepared_cat.svg';
import { ReactComponent as WeAllLieLogo } from '../assets/we_all_lie_white_logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import CommonModal from '../elements/CommonModal';
import { getUserNickname } from '../redux/modules/roomSlice';
import { useCookies } from 'react-cookie';
import { useMemo } from 'react';
import {
  gameOperation,
  giveCategory,
  giveSpy,
} from '../redux/modules/gameSlice';
import RTC from './RTC';

const GameReady = () => {
  const [ready, setReady] = useState(true);
  const [trueAlert, setTrueAlert] = useState(false);
  const [pendingReady, setPendingReady] = useState([]);
  const [rtcExit, setRtcExit] = useState(false);
  const [voteStatus, setVoteStatus] = useState(false);
  const [cookies] = useCookies(['nickname']);
  const [gameEnd, setGameEnd] = useState(false);
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userNick = useSelector((state) => state.room.userNickname);
  const gamePage = useSelector((state) => state.game.gamePage);
  const spy = useSelector((state) => state.game.spy);
  const nickname = cookies.nickname;
  const [stamp, setStamp] = useState(`${nickname}`); //기본값이 본인으로 선택

  //유저 기본 틀
  const initialState = [
    { nickname: '', boolkey: false, id: 1 },
    { nickname: '', boolkey: false, id: 2 },
    { nickname: '', boolkey: false, id: 3 },
    { nickname: '', boolkey: false, id: 4 },
    { nickname: '', boolkey: false, id: 5 },
    { nickname: '', boolkey: false, id: 6 },
    { nickname: '', boolkey: false, id: 7 },
    { nickname: '', boolkey: false, id: 8 },
  ];

  const [userCameras, setUserCameras] = useState(initialState);

  const vacancy = useMemo(() => {
    socket.on('userNickname', (userNickname) => {
      console.log('유저닉', userNickname);
      dispatch(getUserNickname(userNickname));
      setUserCameras(initialState);
      for (let item = 0; item < userNickname.length; item++) {
        if (userCameras[item].nickname !== userNickname[item]) {
          userCameras[item].nickname = userNickname[item];
        }
      }
      return userCameras;
    });
  }, [userCameras]);
  console.log('유저 카메라', userCameras);

  //게임 준비 보냄
  const ReadyHandler = () => {
    setReady((prev) => !prev);
    socket.emit('ready', param.id, `${ready}`, cookies.nickname);
  };

  //게임 준비 받음
  useEffect(() => {
    socket.on('ready', (nic, bool) => {
      setPendingReady([{ nickname: nic, boolkey: bool }]);
    });
    console.log('게임레디 확인', pendingReady);
  }, [pendingReady]);

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

  //준비한 유저 숫자
  const currentUser = userCameras.filter((user) => user.nickname !== '').length;
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

  console.log('currentUser:::', currentUser);
  console.log('trueUser:::', trueUser);

  //접속인원 4명 이상 + 현재 접속인원 === true인원 맞는지 확인
  useEffect(() => {
    if (gamePage === 0) {
      if (currentUser >= 4 && currentUser === trueUser.length) {
        //스파이 유저 받는 소켓
        socket.on('spyUser', (spyUser) => {
          console.log('이건 스파이', spyUser);
          dispatch(giveSpy(spyUser));
        });
        //카테고리 받는 소켓
        socket.on('gameStart', (gameStart) => {
          console.log('이건 카테고리', gameStart);
          dispatch(giveCategory(gameStart));
        });
        setTrueAlert(!trueAlert);
        const nextGameOperation = () => {
          setTimeout(() => {
            setTrueAlert(false);
            dispatch(gameOperation(1));
            console.log('gameOperation(1) 보내줌');
          }, 5000);
        };
        nextGameOperation();
        return () => {
          clearTimeout(nextGameOperation);
        };
      } else if (currentUser > trueUser.length) {
        setTrueAlert(false);
      }
    }
  }, [pendingReady]);

  //GameEnd 화면 띄우기
  useEffect(() => {
    gamePage === 3 && setGameEnd(true);
  }, [gamePage]);

  //나가기 핸들러 들고옴
  const BtnHandler = async () => {
    //RTC 퇴장이벤트
    await setRtcExit(true);

    //나가기 버튼 눌렀을 때 퇴장메세지 이벤트 emit
    await socket.emit('leaveRoomMsg', param.id, nickname);
    // console.log('나가기버튼 누름');

    //퇴장이벤트
    await socket.emit('leaveRoom', param.id, nickname);
    await socket.on('leaveRoom', () => {
      navigate('/home');
    });
    await navigate('/home');
  };

  return (
    <>
      {gamePage === 0 && (
        <ReadyLayout>
          {trueAlert === true && (
            <CommonModal
              main="잠시 후 게임이 시작됩니다! "
              sub="카메라 앞에 앉아 게임을 준비해주세요."
              time
            ></CommonModal>
          )}
          <JinyoungHeader>
            <LogoImg>
              <WeAllLieLogo />
            </LogoImg>
            <Button
              type={'button'}
              addStyle={{
                backgroundColor: '#A5A5A5',
                borderRadius: '6px',
                width: '113px',
                height: '40px',
                color: '#222222',
              }}
              onClick={BtnHandler}
            >
              나가기
            </Button>
          </JinyoungHeader>
          <MediumHeader></MediumHeader>
          <ReadyLayoutSection>
            <ReadyButtonSection>
              <h1>준비 버튼을 클릭하세요 ! </h1>
              <span>모든 플레이어가 준비되면 자동으로 게임이 시작됩니다.</span>
              <ReadyButton>
                <div onClick={ReadyHandler}>
                  {!ready ? '준비완료' : '준비하기'}
                </div>
              </ReadyButton>
            </ReadyButtonSection>
          </ReadyLayoutSection>
        </ReadyLayout>
      )}
      {gamePage === 1 && <GameStart userCameras={userCameras} />}
      {gamePage === 2 && (
        <GameVote
          userCameras={userCameras}
          voteStatus={voteStatus}
          setVoteStatus={setVoteStatus}
          stamp={stamp}
          setStamp={setStamp}
        />
      )}
      {/* <GameVote userCameras={userCameras} /> */}
      {gamePage === 3 && <GameEnd setRtcExit={setRtcExit} />}
      <RTC
        param={param.id}
        nickname={nickname}
        rtcExit={rtcExit}
        ready={ready}
        userCameras={userCameras}
        stamp={stamp}
        setStamp={setStamp}
        voteStatus={voteStatus}
        setVoteStatus={setVoteStatus}
        spy={spy}
        gameEnd={gameEnd}
      />
    </>
  );
};

export default GameReady;

const ReadyLayout = styled.div`
  width: 100%;
  /* height: 90vh; */
  /* height: 30vh; */
  /* min-height: 650px; */
  border-radius: 5px;
`;

const ReadyLayoutSection = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  width: 100%;
  padding: 1vh 0.5%;
`;

const ReadyButtonSection = styled.div`
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

const JinyoungHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 71px;
  flex-wrap: wrap;
`;

const LogoImg = styled.div`
  margin-left: 15px;
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
