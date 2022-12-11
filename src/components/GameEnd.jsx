import React from 'react';
import GameEndHeader from './gameend/GameEndHeader';
import GameEndContents from './gameend/GameEndContents';
import styled from 'styled-components';
import { ReactComponent as WeAllLieWhiteLogo } from '../assets/we_all_lie_white_logo.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from '../shared/socket';
import Button from '../elements/Button';
import { useCookies } from 'react-cookie';
import { useState } from 'react';

const GameEnd = () => {
  // const navigate = useNavigate();
  // const param = useParams();
  // const [cookies] = useCookies(['nickname']);
  // const [spyWin, setSpyWin] = useState(true);

  // const GoOutBtn = () => {
  //   socket.emit('leaveRoom', param.id, cookies.nickname);
  //   socket.on('leaveRoom', () => {
  //     navigate('/home');
  //   });
  //   navigate('/home');
  // };

  // //스파이가 제시어를 고른 뒤 게임 결과
  // socket.on('endGame', (bool) => {
  //   //bool 값에 따라서 아래 조건문 실행
  //   if (bool === true) {
  //     //스파이가 제시어를 맞췄다면, 스파이 승리 화면 컴포넌트로 넘어가기
  //     console.log('스파이승리');
  //     setSpyWin(true); //state 값 유지
  //   } else if (bool === false) {
  //     //스파이가 제시어를 못 맞췄다면, 스파이 패배 화면 컴포넌트로 넘어가기
  //     console.log('스파이패배');
  //     setSpyWin(false);
  //   }
  // });

  return (
    <GameEndEntireContainer>
      {/* <LogoImg>
        <WeAllLieWhiteLogo />
        <Button
          type={'button'}
          addStyle={{
            width: '80px',
            height: '30px',
            fontSize: '14px',
            backgroundColor: '#a5a5a5',
          }}
          onClick={GoOutBtn}
        >
          나가기
        </Button>
      </LogoImg>
      <GameEndHeader spyWin={spyWin} setSpyWin={setSpyWin} />
      <GameEndContents spyWin={spyWin} setSpyWin={setSpyWin} /> */}
      게임 엔드 왔다~!
    </GameEndEntireContainer>
  );
};

const GameEndEntireContainer = styled.div`
  width: 100%;
`;

const LogoImg = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

export default GameEnd;
