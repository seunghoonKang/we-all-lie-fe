import React, { useState } from 'react';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { gameOperation, gameResult } from '../redux/modules/gameSlice';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Camera from '../elements/Camera';
import CommonModal from '../elements/CommonModal';
import Timer from '../elements/Timer';
import { socket } from '../shared/socket';
import WordExamples from './gamevote/WordExamples';

const GameVote = () => {
  // const themeContext = useContext(ThemeContext);
  const param = useParams();
  const dispatch = useDispatch();
  const [cookies] = useCookies(['nickname']);
  const [voteModal, setVoteModal] = useState(false); //투표 버튼 모달
  const [voteDoneModal, setVoteDoneModal] = useState(false); //투표완료 모달
  const [voteStatus, setVoteStatus] = useState(false);
  const [spyAlive, setSpyAlive] = useState('a'); //전체투표에서 스파이가 이겼는지(True) 졌는지(False) 투표전 initialState (a)
  const [spyAnswer, setSpyAnswer] = useState(); //스파이가 클릭한 제시어 initialState(빈값)
  const [spyAnswerStatus, setSpyAnswerStatus] = useState(false); //스파이가 제시어를 전송 했는지(True) 안했는지(False) initialState(false)
  const [timerZero, setTimerZero] = useState(false);
  const [timerAgain, setTimerAgain] = useState(false); //Timer 다시 재생
  const myNickname = cookies.nickname;
  const [stamp, setStamp] = useState(`${myNickname}`); //기본값이 본인으로 선택
  const spy = useSelector((state) => state.game.spy); //스파이 닉네임 들고오기

  const initialState = ['', '', '', '', '', '', '', ''];
  const [userCameras, setUserCameras] = useState(initialState);

  useEffect(() => {
    socket.emit('userNickname', param.id);
    socket.on('userNickname', (user) => {
      console.log(user);
      setUserCameras([...user]);
      return userCameras;
    });
  }, []);
  // socket.emit('userNickname', param.id);
  // socket.on('userNickname', (user) => {
  //   console.log(user);
  //   setUserCameras(initialState);
  //   // setUserCameras(...user);
  //   for (let i = 0; i < user.length; i++) {
  //     if (userCameras[i] !== user[i]) {
  //       let newuserCameras = initialState;
  //       newuserCameras[i] = user[i];
  //       setUserCameras(newuserCameras);
  //       // userCameras[i] = user[i];
  //     }
  //   }
  //   // dispatch(getUserNickname(userCameras));
  //   return userCameras;
  // });

  console.log(userCameras);

  /* 
  투표 기본값 : 본인 (O) -> stamp가 찍혀있진 않음
  투표 시간이 다 되었을때, 투표 처리
  우선책 : 현재 클릭한 사람으로 자동 투표 완료 처리 (O)
  차선책 : 강제로 본인 투표한 걸로 처리

  스파이가 이기는 로직이면 true, 지는 로직이면 false
  첫번쨰 파라미터는 항상 방번호로 emit하기
  사람들이 투표했을 때 스파이가 걸렸는지 아닌지 'spyWin'
  스파이가 걸렸을 때 제시어를 맞췄는지 아닌지 'spyGuess'
  스파이가 이겼는지 졌는지 'endGame'
  */

  //내가 마지막으로 선택한 사람 닉네임 = stamp
  // console.log('stamp::', stamp);

  //00:00 일때 미투표상태일시 현재 stamp 찍혀있는 사람으로 자동 emit
  useEffect(() => {
    if (timerZero === true) {
      if (voteStatus === false) {
        socket.emit('voteSpy', param.id, stamp);
        console.log('투표를 안해서 마지막으로 클릭한 사람 보내줌 ::', stamp);
        setVoteStatus(true);
      }
      if (spy === myNickname) {
        if (spyAnswerStatus === false) {
          socket.emit('spyGuess', param.id, spyAnswer, myNickname);
          console.log('스파이가 마지막으로 클릭한 키워드 보내줌 ::', spyAnswer);
        }
      }
      console.log('시간초 끝!');

      //*****임의로 setSpyAlive socket으로 받은 척 ! (dev/main PR 할땐 주석처리하기)*****
      // setVoteDoneModal(true);
      // setTimeout(() => {
      //   setSpyAlive(false); //true => 스파이 승리 화면 / false => 스파이 키워드 선택 화면
      //   setVoteDoneModal(false);
      //   setTimerAgain(true);
      // }, 5000);
    }
  }, [timerZero]);

  //스파이 추정 유저 투표로 선택. => CommonModal.jsx 로 이동
  //socket.emit('voteSpy', param.id, stamp);

  //백엔드에서 전달받은 에러
  socket.on('error', (a, b) => {
    console.log(a);
    console.log(b);
  });

  //투표결과, 스파이가 이겼는지 결과(boolean) on 받기
  //*********************************(dev/main PR 할땐 주석풀기)*****
  socket.on('spyWin', (result) => {
    console.log('spyWin 받았다:', result);
    //전체투표 끝나고 321모달 띄워주기
    setVoteDoneModal(true);
    //이겼는지(True) 졌는지(False) 값
    setTimeout(() => {
      setVoteDoneModal(false);
      setSpyAlive(result);
      //스파이가 찍혔다면, 타이머 다시 재생
      if (result === false) {
        setTimerAgain(true);
      }
    }, 5000);
  });

  //전체투표 결과1 : spyAlive(true) 스파이가 이겼을때, 스파이 승리 화면 컴포넌트로 넘어가기
  useEffect(() => {
    spyAlive === true && dispatch(gameOperation(3));
  }, [spyAlive]);

  //스파이가 제시어를 고른 뒤 게임 결과 (console말고는 다른점 없음,,) => GameEndContents에도 씀
  socket.on('endGame', (bool) => {
    //=> spyGuess 이후에 자동으로 emit 되고 있는지? / 이 방 모두에게 뿌려주는 지?
    console.log('endGame 받아왔다!');
    //bool 값에 따라서 아래 조건문 실행
    if (bool === true) {
      //스파이가 제시어를 맞췄다면, 스파이 승리 화면 컴포넌트로 넘어가기
      console.log('스파이승리');
      dispatch(gameResult(1));
      dispatch(gameOperation(3));
    } else if (bool === false) {
      //스파이가 제시어를 못 맞췄다면, 스파이 패배 화면 컴포넌트로 넘어가기
      console.log('스파이패배');
      dispatch(gameResult(2));
      dispatch(gameOperation(3));
    }
  });

  console.log('spyAnswer 잘 들어왔나', spyAnswer);

  //스파이 투표 종료 후 개인 결과 집계.
  //socket.emit('voteRecord', nickname);

  return (
    <Layout>
      {voteDoneModal && (
        <CommonModal
          main="모든 유저의 투표가 완료되었습니다."
          sub="잠시 뒤 게임 결과가 공개됩니다!"
          time
        />
      )}
      {spyAlive === false ? (
        <HeaderSection>
          📌 스파이가 검거되어 스파이가 키워드를 선택하고 있습니다.
        </HeaderSection>
      ) : (
        <HeaderSection>📌 모든 유저가 투표를 진행하고 있습니다.</HeaderSection>
      )}

      <TimerContainer>
        {spyAlive !== false && (
          <TimerDiv sec={'20'}>
            <MinWidthTimerDiv>
              <Timer
                sec="20"
                timerZero={timerZero}
                setTimerZero={setTimerZero}
              />
            </MinWidthTimerDiv>
          </TimerDiv>
        )}
        {timerAgain && (
          <TimerDiv sec={'30'}>
            <MinWidthTimerDiv>
              <Timer
                sec="30"
                timerZero={timerZero}
                setTimerZero={setTimerZero}
              />
            </MinWidthTimerDiv>
          </TimerDiv>
        )}
        {/* <Timer sec="20" timerZero={timerZero} setTimerZero={setTimerZero} /> */}
      </TimerContainer>

      {spyAlive === false ? (
        //전체투표 결과2 : spyAlive(false) 스파이가 졌을때, 스파이가 키워드 선택하는 걸 띄워주기
        <Vote>
          <VoteTitle>키워드는 무엇일까요?</VoteTitle>
          <VoteContent>
            검거를 피할 마지막 기회! 추측한 키워드를 선택하세요
          </VoteContent>
          <VoteButton onClick={() => setVoteModal(!voteModal)}>
            선택하기
          </VoteButton>
          {/* {spyAnswerStatus && voteModal === true ? ( */}
          {spyAnswer && voteModal === true ? (
            <CommonModal
              main="이 키워드를 선택할까요?"
              sub="키워드 선택 이후 수정은 불가합니다."
              firstBtn="다시선택"
              secBtn="선택하기"
              spyAlive={spyAlive}
              // voteStatus={voteStatus}
              // setVoteStatus={setVoteStatus}
              voteModal={voteModal}
              setVoteModal={setVoteModal}
              spyAnswer={spyAnswer}
              spyAnswerStatus={spyAnswerStatus}
              setSpyAnswerStatus={setSpyAnswerStatus}
              // stamp={stamp}
              param={param}
              socket={socket}
              //state 넘겨주기
            ></CommonModal>
          ) : (
            <></>
          )}
        </Vote>
      ) : voteStatus ? (
        <Vote>
          <VoteTitle>투표 완료</VoteTitle>
          <VoteContent>다른 플레이어의 투표를 기다리는 중입니다.</VoteContent>
        </Vote>
      ) : (
        <Vote>
          <VoteTitle>스파이를 검거하세요 !</VoteTitle>
          <VoteContent>
            스파이로 의심되는 유저의 화면을 클릭해 투표하세요.
          </VoteContent>
          <VoteButton onClick={() => setVoteModal(!voteModal)}>
            투표하기
          </VoteButton>
          {stamp && voteModal === true ? (
            <CommonModal
              main="이 유저에게 투표할까요?"
              sub="투표 완료후 재투표는 불가합니다."
              firstBtn="다시선택"
              secBtn="투표하기"
              spyAlive={spyAlive}
              voteStatus={voteStatus}
              setVoteStatus={setVoteStatus}
              voteModal={voteModal}
              setVoteModal={setVoteModal}
              stamp={stamp}
              param={param}
              socket={socket}
            ></CommonModal>
          ) : (
            <></>
          )}
        </Vote>
      )}
      {spyAlive === false ? (
        <CardContainer>
          <WordExamples spyAnswer={spyAnswer} setSpyAnswer={setSpyAnswer} />
        </CardContainer>
      ) : (
        <Users>
          {userCameras.map((person, index) => (
            <Camera
              person={person}
              //person={person.nickname}
              key={index}
              stamp={stamp}
              setStamp={setStamp}
              voteStatus={voteStatus}
              setVoteStatus={setVoteStatus}
            />
          ))}
        </Users>
      )}
    </Layout>
  );
};

export default GameVote;

const Layout = styled.div`
  width: 100%;
  position: relative;
  background-color: white;
  border-radius: 10px;
  padding: 16px;
  min-height: 650px;
  height: 90vh;
`;

const HeaderSection = styled.section`
  font-size: ${(props) => props.theme.fontSize.default};
  font-weight: 700;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 20px; ;
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
  /* animation-duration: 20s; */
  animation-duration: ${(props) => props.sec}s;
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

const VoteButton = styled.button``;
const VoteTitle = styled.h2``;
const VoteContent = styled.h3``;
const Vote = styled.div`
  background-color: ${(props) => props.theme.color.gray1};
  width: 100%;
  min-height: 180px;
  height: 22vh;
  /* text-align: center; */
  margin-top: 2vh;
  margin-bottom: 2vh;
  padding: 30px 30px;
  /* padding-bottom: 60px; */
  border-radius: 6px;
  ${VoteTitle} {
    font-size: 22px;
    font-weight: 700;
    text-shadow: 2px 2px 1px #b7b7b7;
  }
  ${VoteContent} {
    margin-top: 10px;
  }
  ${VoteButton} {
    ${(props) => props.theme.button.buttonL}
    border: 1px solid ${(props) => props.theme.color.lionOrange};
    color: ${(props) => props.theme.color.lionOrange};
    font-weight: 700;
    margin-top: 20px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly; //가로 띄우기
  align-content: space-evenly; //세로 띄우기
  width: 100%;
  height: 50vh;
  min-height: 312px;
  /* background-color: gray; */
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
