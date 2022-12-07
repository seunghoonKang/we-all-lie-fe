import React, { useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import Camera from '../elements/Camera';
import CommonModal from '../elements/CommonModal';
import Timer from '../elements/Timer';
import { socket } from '../shared/socket';

const GameVote = () => {
  // const themeContext = useContext(ThemeContext);
  const param = useParams();
  const [cookies, setCookies] = useCookies(['nickname']);
  const [voteModal, setVoteModal] = useState(false);
  const [voteStatus, setVoteStatus] = useState(false);
  const [spyWin, setSpyWin] = useState(0);
  const [spyGuess, setSpyGuess] = useState(0);
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

  //투표시간 setTimeout 걸기
  //내가 아직 투표를 하지 않았다면 현재 stamp 찍혀있는 사람으로 자동 emit
  setTimeout(() => {
    if (voteStatus === false) {
      socket.emit('voteSpy', param.id, stamp);
      console.log('투표를 안해서 마지막으로 클릭한 사람 보내줌 ::', stamp);
      setVoteStatus(true);
    }
  }, 20000);

  //내가 선택한 사람 닉네임 = stamp
  console.log('stamp::', stamp);

  //내가 스파이 유저 선택. => CommonModal.jsx 로 이동
  //socket.emit('voteSpy', param.id, stamp);

  //스파이 투표 종료 후 개인 결과 집계.
  //socket.emit('voteRecord');

  //투표결과, 스파이가 이겼는지 결과 on 받기
  socket.on('spyWin', (bool) => {
    setSpyWin(bool);
  });

  //투표결과, (socket.on 안에 쓰지 않은 이유 : socket 은 몇번이고 실시간 통신이 이루어지기 때문에, 그 때마다 if문도 실행 될 것 같아서)
  if (spyWin === true) {
    //스파이가 이겼다면, 스파이 승리 화면 컴포넌트로 넘어가기
  } else if (spyWin === false) {
    //스파이가 졌다면, 스파이가 제시어 맞추는 컴포넌트로 넘어가기
    //스파이가 제시어를 맞췄는지 결과 on 받기
    socket.on('spyGuess', (bool) => {
      setSpyGuess(bool);
    });
    if (spyGuess === true) {
      //스파이가 이겼다면, 스파이 승리 화면 컴포넌트로 넘어가기
    } else if (spyGuess === false) {
      //스파이가 졌다면, 스파이 패배 화면 컴포넌트로 넘어가기
    }
  }

  return (
    <Layout
    // theme={themeContext}
    >
      <HeaderSection>📌 모든 유저가 투표를 진행하고 있습니다.</HeaderSection>
      {/* <Timer>
        <Time></Time>
      </Timer> */}
      <TimerContainer>
        <TimerDiv>
          <MinWidthTimerDiv>
            <Timer sec="20" />
          </MinWidthTimerDiv>
        </TimerDiv>
      </TimerContainer>
      {voteStatus ? (
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
