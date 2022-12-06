import React, { useEffect } from 'react';
import Notice from '../elements/Notice';
import Chat from '../components/Chat';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { socket } from '../shared/socket';
import { useBeforeunload } from 'react-beforeunload';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import GameReady from '../components/GameReady';
import GameStart from '../components/GameStart';
import GameVote from '../components/GameVote';
import RoomChat from '../components/RoomChat';

const Room = () => {
  // 새로고침방지
  useBeforeunload((event) => event.preventDefault());
  const param = useParams();
  const [cookies, setCookies] = useCookies(['nickname']);
  const navigate = useNavigate();
  const goFromStartToVote = useSelector(
    (state) => state.game.goFromStartToVote
  );
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
  socket.on('ready', (room) => {
    // console.log(room);
  });

  useEffect(() => {
    //로그인 안하면 로비입장 못하게 하기 (useEffect 안에 넣어야 navigate 먹어요)
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
          <Game>
            {/* 본인 컴포넌트말고 주석하면 돼용 */}
            {/* <GameReady /> */}
            {/* <GameStart /> */}
            {/* {goFromStartToVote ? <GameVote /> : <GameStart />} */}
            <GameVote />
          </Game>

          <RoomChat />
        </Box>
      </>
    );
  }
};

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

//List 없애고 Game 에 합침
const Game = styled.div`
  //background-color: lightpink;
  /* height: 100%; */
  width: calc(100% - 350px);
  height: 90vh;
  min-height: 650px;
`;

export default Room;
