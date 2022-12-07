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
import GameEnd from '../components/GameEnd';

const Room = () => {
  // 새로고침방지
  useBeforeunload((event) => event.preventDefault());
  const param = useParams();
  const [cookies, setCookies] = useCookies(['nickname']);
  const navigate = useNavigate();
  const gameOperation = useSelector((state) => state.game.gameOperation);

  console.log('게임 값 다 받고 실행할 값', gameOperation);

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
            {gameOperation === 1 ? <GameStart /> : <GameReady />}
            {/* <GameReady /> */}
            {/* <GameStart /> */}
            {/* {goFromStartToVote ? <GameVote /> : <GameStart />} */}
            {/* <GameVote /> */}
          </Game>
          {/* <GameEnd /> */}
          <RoomChat />
        </Box>
      </>
    );
  }
};

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 16px 0 16px;
`;

//List 없애고 Game 에 합침
const Game = styled.div`
  width: calc(100% - 350px);
  height: 90vh;
  min-height: 650px;
`;

export default Room;
