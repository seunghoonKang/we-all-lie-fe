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
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const GameEnd = ({ setRtcExit }) => {
  const navigate = useNavigate();
  const param = useParams();
  const [cookies] = useCookies(['nickname']);
  // // const [spyWin, setSpyWin] = useState(true);
  // const gameResult = useSelector((state) => state.game.gameResult);

  const GoOutBtn = async () => {
    await setRtcExit(true);
    await socket.emit('leaveRoom', param.id, cookies.nickname);
    await socket.on('leaveRoom', () => {
      navigate('/home');
    });
    await navigate('/home');
  };

  //스파이가 제시어를 고른 뒤 게임 결과
  // useEffect(() => {
  //   console.log(gameResult);
  //   gameResult === 1 && setSpyWin(true);
  //   gameResult === 2 && setSpyWin(false);
  // }, []);

  return (
    <GameEndEntireContainer>
      <LogoImg>
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
      <GameEndHeader />
      {/* <GameEndContents /> */}
    </GameEndEntireContainer>
  );
};

const GameEndEntireContainer = styled.div`
  width: calc(100% + 350px);
`;

const LogoImg = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 14px 0;
`;

export default GameEnd;
