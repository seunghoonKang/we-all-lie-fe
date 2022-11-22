import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../elements/Button';
import Camera from '../elements/Camera';
import { socket } from '../shared/socket';
import Timer from './gamestart/Timer';

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

  useEffect(() => {
    const checkNotDisabledBtn = setTimeout(() => {
      setDisabledBtn('투표하기');
    }, 5000);

    return () => {
      clearTimeout(checkNotDisabledBtn);
    };
  }, []);

  const voteBtnHandler = () => {
    alert('투표하기 벝은');
  };
  const items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  return (
    <GameEntireContainer>
      <HeaderSection>
        <HeaderTitle>
          <Timer min="8" />
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
      <VideoContainer>
        {items.map((item, index) => (
          <Camera num={index + 1} />
        ))}
      </VideoContainer>
      <GameCardSection>
        <CorrectCard>
          <p>영화관</p>
        </CorrectCard>
        <Question>
          <div>[게으른 토끼] 가 [말많은 호랑이] 에게 질문합니다.</div>
          <Button type={'button'} addStyle={{}} doong>
            테스트
          </Button>
          <TimeRemaining>
            <Timer sec="45" onClick={(e) => console.log(e)} />
          </TimeRemaining>
        </Question>
      </GameCardSection>
    </GameEntireContainer>
  );
};

const GameEntireContainer = styled.div`
  min-width: 848px;
  height: calc(90vh - 60px);
  position: relative;
`;

const HeaderSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: skyblue;
`;

const HeaderTitle = styled.div`
  margin-left: 16px;
`;

const VideoContainer = styled.div`
  display: flex;
  height: calc(90vh - 60px);
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 280px 0;
`;

const GameCardSection = styled.section`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CorrectCard = styled.div`
  width: 26.5rem;
  height: 13.75rem;
  background-color: #968282;
  display: flex;
  justify-content: center;
  align-items: end;
`;

const Question = styled.div`
  width: 26.5rem;
  height: 13.75rem;
  background-color: #968282;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
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
