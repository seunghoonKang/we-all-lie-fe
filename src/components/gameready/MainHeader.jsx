import React from 'react';
import styled from 'styled-components';
import Button from '../../elements/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from '../../shared/socket';
import { useCookies } from 'react-cookie';
import { ReactComponent as WeAllLieLogo } from '../../assets/we_all_lie_white_logo.svg';
import { getUserNickname } from '../../redux/modules/roomSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const MainHeader = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(['nickname']);
  const [rtcOut, setRtcOut] = useState(false);
  const nickname = cookies.nickname;
  const BtnHandler = () => {
    //나가기 버튼 눌렀을 때 퇴장메세지 이벤트 emit
    socket.emit('leaveRoomMsg', param.id, nickname);
    console.log('나가기버튼 누름');
    //퇴장이벤트
    socket.emit('leaveRoom', param.id, nickname);
    socket.on('leaveRoom', () => {
      navigate('/home');
    });
    navigate('/home');
    //RTC 퇴장이벤트
    setRtcOut(true);
    //리덕스에 true 값 보내주는 식 작성
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
