import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { gameOperation } from '../redux/modules/gameSlice';
import { useParams } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import Camera from '../elements/Camera';
import CommonModal from '../elements/CommonModal';
import Timer from '../elements/Timer';
import { socket } from '../shared/socket';
import WordExamples from './gamevote/WordExamples';

const GameVote = () => {
  // const themeContext = useContext(ThemeContext);
  const param = useParams();
  const dispatch = useDispatch();
  const [cookies, setCookies] = useCookies(['nickname']);
  const [voteModal, setVoteModal] = useState(false);
  const [voteStatus, setVoteStatus] = useState(false);
  const [spyAlive, setSpyAlive] = useState(0); //전체투표에서 스파이가 이겼는지 졌는지
  const [spyNeedAnswer, setSpyNeedAnswer] = useState(false); //필요없을지도
  const [spyAnswer, setSpyAnswer] = useState(); //전체투표에서 스파이가 졌을때 맞추는 단어
  const [spyAnswerStatus, setSpyAnswerStatus] = useState(false);
  const [timeout, setTimeout] = useState(false);
  const userNickname = useSelector((state) => state.room.userNickname); //유저닉네임 들고오기

  const userCameras = [
    { nickName: 'a' },
    { nickName: 'b' },
    { nickName: 'c' },
    { nickName: 'd' },
    { nickName: 'e' },
    { nickName: 'f' },
    { nickName: 'g' },
    { nickName: 'h' },
  ];
  const nickname = cookies.nickname;
  const userLength = userCameras.length;
  const [stamp, setStamp] = useState(`${nickname}`); //기본값이 본인으로 선택

  console.log('userNickname::', userNickname);
  console.log('voteStatus::', voteStatus);

  /* 
  투표 기본값 : 본인 (O) -> stamp가 찍혀있진 않음
  투표 시간이 다 되었을때, 투표 처리
  우선책 : 현재 클릭한 사람으로 자동 투표 완료 처리 (O)
  차선책 : 강제로 본인 투표한 걸로 처리

  스파이가 이기는 로직이면 true, 지는 로직이면 false
  첫번쨰 파라미터는 항상 방번호로 emit하기
  사람들이 투표했을 때 스파이가 걸렸는지 아닌지 'spyWin'
  스파이가 걸렸을 때 제시어를 맞췄는지 아닌지 'spyGuess'
  스파이가 이겼는지 졌는지
  */

  //내가 마지막으로 선택한 사람 닉네임 = stamp
  console.log('stamp::', stamp);

  //00:00 일때 미투표상태일시 현재 stamp 찍혀있는 사람으로 자동 emit
  if (timeout === true) {
    if (voteStatus === false) {
      socket.emit('voteSpy', param.id, stamp);
      console.log('투표를 안해서 마지막으로 클릭한 사람 보내줌 ::', stamp);
      setVoteStatus(true);
    }
  }

  //내가 스파이 유저 선택. => CommonModal.jsx 로 이동
  //socket.emit('voteSpy', param.id, stamp);

  //투표결과, 스파이가 이겼는지 결과(boolean) on 받기
  socket.on('spyWin', (result) => {
    setSpyAlive(result);
  });

  //전체투표 결과1 : 스파이가 이겼을때, 스파이 승리 화면 컴포넌트로 넘어가기
  useEffect(() => {
    spyAlive === true && dispatch(gameOperation(3));

    // if (spyAlive === true) {
    //   dispatch();
    // } else if (spyAlive === false) {
    //   spyGuessStatus();
    //   //스파이가 제시어를 맞췄는지 결과 emit 하기 => CommonModal로 넘김
    //   // socket.emit('spyGuess', (param.id, spyGuess, nickname));
    // }
  }, [spyAlive]);

  //스파이가 제시어를 고른 뒤 게임 결과
  socket.on('endGame', (bool) => {
    //bool 값에 따라서 아래 조건문 실행
    if (bool === true) {
      //스파이가 제시어를 맞췄다면, 스파이 승리 화면 컴포넌트로 넘어가기
      dispatch(gameOperation(3));
    } else if (bool === false) {
      //스파이가 제시어를 못 맞췄다면, 스파이 패배 화면 컴포넌트로 넘어가기
    }
  });

  //스파이 투표 종료 후 개인 결과 집계.
  //socket.emit('voteRecord', nickname);

  return (
    <Layout>
      <HeaderSection>📌 모든 유저가 투표를 진행하고 있습니다.</HeaderSection>
      <TimerContainer>
        <TimerDiv>
          <MinWidthTimerDiv>
            <Timer sec="20" timeout={timeout} setTimeout={setTimeout} />
          </MinWidthTimerDiv>
        </TimerDiv>
      </TimerContainer>

      {spyAlive === false ? (
        //전체투표 결과2 : (스파이)스파이가 졌을때, 스파이가 키워드 선택하는 걸 띄워주기
        <Vote>
          <VoteTitle>키워드는 무엇일까요?</VoteTitle>
          <VoteContent>
            검거를 피할 마지막 기회! 추측한 키워드를 선택하세요
          </VoteContent>
          <VoteButton onClick={() => setVoteModal(!voteModal)}>
            선택하기
          </VoteButton>
          {stamp && voteModal === true ? (
            <CommonModal
              main="이 키워드를 선택할까요?"
              sub="키워드 선택 이후 수정은 불가합니다."
              firstBtn="다시선택"
              secBtn="선택하기"
              // voteStatus={voteStatus}
              // setVoteStatus={setVoteStatus}
              // voteModal={voteModal}
              // setVoteModal={setVoteModal}
              // stamp={stamp}
              // param={param}
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
          <WordExamples />
        </CardContainer>
      ) : (
        <Users userLength={userLength}>
          {userCameras.map((person) => (
            <Camera
              person={person.nickName}
              key={person.nickName}
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

// const Time = styled.div``;
// const Timer = styled.div`
//   width: 100%;
//   height: 40px;
//   background-color: ${(props) => props.theme.color.gray1};
//   border-radius: 6px;
//   overflow: hidden;
//   position: relative;
//   ${Time} {
//     width: 100%;
//     height: 40px;
//     background-color: ${(props) => props.theme.color.lionBlack};
//     position: absolute;
//     left: -50%;
//   }
// `;
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
  animation-duration: 20s;
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

const Users = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly; //가로 띄우기
  align-content: space-evenly; //세로 띄우기
  width: 100%;
  height: 50vh;
  min-height: 312px;
`;
