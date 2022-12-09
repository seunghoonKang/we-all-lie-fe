import React from 'react';
import styled from 'styled-components';
import Button from '../../elements/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from '../../shared/socket';
import { ReactComponent as WeAllLieLogo } from '../../assets/we_all_lie_white_logo.svg';

const MainHeader = () => {
  const param = useParams();
  const navigate = useNavigate();
  const BtnHandler = () => {
    alert('홈 화면으로 슈우웅');
    socket.emit('leaveRoom', param.id);

    socket.on('leaveRoom', () => {
      navigate('/home');
    });
    navigate('/home');
  };

  return (
    <Section>
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
    </Section>
  );
};

export default MainHeader;

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 71px;
  flex-wrap: wrap;
`;

const LogoImg = styled.div`
  margin-left: 15px;
`;
