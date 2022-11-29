import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../elements/Button';
import Camera from '../elements/Camera';
import { socket } from '../shared/socket';
import Timer from './gamestart/Timer';
import { ReactComponent as Megaphone } from '../assets/megaphone.svg';
import { useNavigate, useParams } from 'react-router-dom';
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
  const [answerer, setAnswerer] = useState(false);
  const [asker, setAsker] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState('투표준비');
  const navigate = useNavigate();
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
    <GameEntireContainer>
      <HeaderSection>
        <HeaderTitle>
          <MegaphoneDiv>
            <Megaphone width="15" height="13" fill="none" />
          </MegaphoneDiv>
          <Timer min="8" />
          <div>[게으른 토끼] 가 [말많은 호랑이] 에게 질문합니다.</div>
        </HeaderTitle>
        <Button
          type={'button'}
          addStyle={{
            backgroundColor: '#2B2B2B',
            borderRadius: '6px',
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
      <GameCardSection>
        <Question>
          <div>
            <p className=" font-semibold text-[22px]">질문할 차례입니다!</p>
          </div>
          <div>
            <p>질문하고 싶은 유저의 화면을 클릭하세요.</p>
          </div>
          <Button type={'button'} addStyle={{}} doong>
            테스트
          </Button>
          <TimeRemaining>
            <Timer sec="45" onClick={(e) => console.log(e)} />
          </TimeRemaining>
        </Question>
        <CorrectCard>
          <p>영화관</p>
        </CorrectCard>
      </GameCardSection>
      <VideoContainer>
        {userCameras.map((person) => (
          <Camera
            nickname={person.nickName}
            asker={asker}
            setAsker={setAsker}
            answerer={answerer}
            setAnswerer={setAnswerer}
            key={person.nickName}
          />
        ))}
      </VideoContainer>
    </GameEntireContainer>
  );
};

const GameEntireContainer = styled.div`
  width: 100%;
  position: relative;
`;

const HeaderSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: absolute;
  top: 16px;
  z-index: 999;
  gap: 10px;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  background-color: #ff8217;
  height: 40px;
  width: 97%;
`;

const MegaphoneDiv = styled.div`
  margin-left: 16px;
  margin-right: 8px;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
  padding-top: 67px;
  margin-bottom: 16px;
`;

const CorrectCard = styled.div`
  width: 27.625rem;
  height: 13.75rem;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: end;
  flex-grow: 1;
`;

const Question = styled.div`
  width: 27.625rem;
  height: 13.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
  flex-grow: 1;
`;

const TimeRemaining = styled.div`
  width: 12.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  margin-top: 5px;
`;

export default GameStart;
