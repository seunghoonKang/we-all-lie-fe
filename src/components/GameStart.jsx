import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../elements/Button';
import Camera from '../elements/Camera2';
import { socket } from '../shared/socket';
import Timer from './gamestart/Timer';
import { ReactComponent as Megaphone } from '../assets/megaphone.svg';
import { ReactComponent as VoteIcon } from '../assets/voteIcon.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
/* 
1. spy랜덤 지정
어떤 닉네임의 배열이 있다면 (ex. members=['홍길동','키티','반페르시','반다이크']), 배열의.length (4)가 총 인원수가 되겠다.
그 값을 max에 넣어주자.

2. 변수를 만들자 
const SpyNickname = members[pickSpyNumber(members.length)]
그리고 랜덤으로 나온 숫자 (ex. 1)이라면 socket.emit('selectSpy', SpyNickname)를 넣는다.

const pickSpyNumber = (max) =>{ 
  return Math.floor(Math.random() * max); 
}
socket.emit('selectSpy', SpyNickname)

3. citizens 작성해두자. 이 나머지는 정답 카드를 받아야 하기 때문. 
const citizens = members.filter((member) => member != SpyNickname);

*/

const GameStart = () => {
  const [disabledBtn, setDisabledBtn] = useState('투표준비');
  const navigate = useNavigate();
  const asker = useSelector((state) => state.game.asker);
  const answerer = useSelector((state) => state.game.answerer);

  useEffect(() => {
    const checkNotDisabledBtn = setTimeout(() => {
      setDisabledBtn('투표하기');
    }, 5000);

    return () => {
      clearTimeout(checkNotDisabledBtn);
    };
  }, []);

  const param = useParams();
  const voteBtnHandler = () => {
    alert('방 나가기 소켓 임시로 넣었음');
    socket.emit('leaveRoom', param.id);
    socket.on('leaveRoom', () => {
      navigate('/home');
    });
    navigate('/home');
  };
  const userCameras = [
    { nickName: '승훈' },
    { nickName: '연석' },
    { nickName: '진영' },
    { nickName: '형석' },
    { nickName: '민형' },
    { nickName: '하은' },
    { nickName: '윤진' },
    { nickName: '주은' },
  ];

  return (
    <>
      <HeaderSection>
        <HeaderTitle>
          <div className="flex">
            <MegaphoneDiv>
              <Megaphone width="15" height="13" fill="none" />
            </MegaphoneDiv>
            {answerer === '' ? (
              <div>[{asker}] (이)가 질문하고 싶은 유저를 찾고 있습니다.</div>
            ) : (
              <div>
                [{asker}] (이)가 [{answerer}] 에게 질문합니다.
              </div>
            )}
          </div>
          <div className="flex gap-[6px]">
            <VoteIconDiv>
              <VoteIcon width="16" height="16" fill="none" />
            </VoteIconDiv>
            <div className=" pr-2">3/7</div>
          </div>
        </HeaderTitle>
        <Button
          type={'button'}
          addStyle={{
            backgroundColor: '#2B2B2B',
            borderRadius: '10px 10px 0 0',
            width: '113px',
            height: '40px',
            color: '#fff',
          }}
          onClick={voteBtnHandler}
          disabled
        >
          {disabledBtn}
        </Button>
      </HeaderSection>
      <GameEntireContainer>
        <GameCardSection>
          <Question>
            <TimerContainer>
              <TimerDiv>
                <MinWidthTimerDiv>
                  <Timer min="8" />
                </MinWidthTimerDiv>
              </TimerDiv>
            </TimerContainer>
            <div className="mt-[77px] pl-[37px]">
              <div>
                <p className=" font-semibold text-[22px]">질문할 차례입니다!</p>
              </div>
              <div>
                <p>질문하고 싶은 유저의 화면을 클릭하세요.</p>
              </div>
            </div>
            {/* <Button type={'button'} addStyle={{}} doong>
              테스트
            </Button>
            <TimeRemaining>
              <Timer sec="45" onClick={(e) => console.log(e)} />
            </TimeRemaining> */}
          </Question>
          <CorrectCard>
            <CorrectAnswer>
              <p>카지노/카지노 딜러</p>
            </CorrectAnswer>
            <IllustSection>
              <p>일러스트</p>
            </IllustSection>
          </CorrectCard>
        </GameCardSection>
        <VideoContainer>
          {userCameras.map((person) => (
            <Camera nickname={person.nickName} key={person.nickName} />
          ))}
        </VideoContainer>
      </GameEntireContainer>
    </>
  );
};

const GameEntireContainer = styled.div`
  width: 100%;
  height: 86vh;
  background-color: #fff;
`;

const HeaderSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 999;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px 10px 0 0;
  background-color: #fff;
  height: 40px;
  width: 97%;
`;

const MegaphoneDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
  margin-right: 8px;
`;

const VoteIconDiv = styled.div`
  display: flex;
  align-items: center;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  min-height: 384px;
  height: 50vh;
  gap: 16px 16px;
  padding: 16px;
  background-color: white;
  border-radius: 10px;
`;

const GameCardSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
  gap: 16px;
`;

const TimerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  background-color: #f5f5f5;
`;

const TimerDiv = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 40px;
  border-radius: 6px;
  color: #fff;
  background-color: #222;
  animation-name: progressTimeBar;
  animation-duration: 10s;
  animation-iteration-count: 1;
  animation-direction: reverse;
  animation-timing-function: linear;
  animation-fill-mode: forwards;

  @keyframes progressTimeBar {
    from {
      width: 0%;
      background-color: red;
    }
    to {
      width: 100%;
    }
  }
`;

const MinWidthTimerDiv = styled.div`
  min-width: 70px;
  margin-left: 37px;
`;

const CorrectAnswer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  padding-left: 34px;
  width: 100%;
  height: 40px;
  border-radius: 6px 6px 0 0;
  background-color: #f5f5f5;
`;

const CorrectCard = styled.div`
  width: 26.5rem;
  height: 14.5625rem;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-top: 15px;
  padding-right: 18px;
`;

const Question = styled.div`
  width: 26.5rem;
  height: 14.5625rem;
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  flex-grow: 1;
  padding-top: 15px;
`;

const IllustSection = styled.div`
  width: 100%;
  height: 12.0625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dfdfdf;
`;

export default GameStart;
