import React, { useEffect } from 'react';
import Notice from '../elements/Notice';
import Chat from '../components/Chat';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from '../shared/socket';
import { useBeforeunload } from 'react-beforeunload';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import GameReady from '../components/GameReady';
import GameStart from '../components/GameStart';
import GameVote from '../components/GameVote';

const Room = () => {
  // //새로고침방지
  useBeforeunload((event) => event.preventDefault());
  const param = useParams();
  console.log(param.id);
  const [cookies, setCookies] = useCookies(['nickname']);
  const navigate = useNavigate();
  /*
  useEffect(() => {
    return () => {
      socket.emit('leaveRoom', param.id);
    };
  });
  const navigate = useNavigate();
  const onClickhandler = () => {
    socket.emit('leaveRoom', param.id);
    navigate('/home');
  };
  */

  useEffect(() => {
    //로그인 안하면 로비입장 못하게 하기
    if (cookies.nickname === undefined || null) {
      alert('로그인해주세요');
      navigate(`/`);
    }
  }, []);
  if (cookies.nickname === undefined || null) {
  } else {
    return (
      <>
        <Notice />
        <Box>
          <List>
            <HeaderSection>
              <HeaderTitle>아마도이미지/게임시작하면 타이머?</HeaderTitle>
              <MakeRoomBtn>방 나가기</MakeRoomBtn>
            </HeaderSection>
            <Game>
              본인 컴포넌트말고 주석하면 돼용
              <GameReady />
              <GameStart />
              <GameVote />
            </Game>
          </List>
          <Chat />
        </Box>
      </>
    );
  }
};

const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;

const List = styled.div`
  width: calc(100% - 350px);
  height: 90vh;
  min-height: 650px;
  margin-bottom: 100px;
  overflow-y: auto;
`;

const HeaderSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: skyblue;
`;

const Game = styled.div`
  background-color: lightpink;
  height: calc(90vh - 60px);
`;

const HeaderTitle = styled.div`
  margin-left: 16px;
`;

const MakeRoomBtn = styled.button`
  width: 96px;
  height: 36px;
  margin-right: 18px;
  background-color: #d9d9d9;
`;

export default Room;
