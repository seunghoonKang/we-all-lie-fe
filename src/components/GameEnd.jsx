import React from 'react';
import GameEndHeader from './gameend/GameEndHeader';
import GameEndContents from './gameend/GameEndContents';
import styled from 'styled-components';
import { ReactComponent as WeAllLieWhiteLogo } from '../assets/we_all_lie_white_logo.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from '../shared/socket';
import Button from '../elements/Button';
import { useCookies } from 'react-cookie';

const GameEnd = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [cookies] = useCookies(['nickname']);

  const GoOutBtn = () => {
    socket.emit('leaveRoom', param.id, cookies.nickname);
    socket.on('leaveRoom', () => {
      navigate('/home');
    });
    navigate('/home');
  };
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
      <GameEndContents />
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
