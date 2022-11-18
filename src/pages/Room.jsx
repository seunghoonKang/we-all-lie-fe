import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from '../shared/socket';

const Room = () => {
  const param = useParams();
  console.log(param.id);
  const navigate = useNavigate();
  const onClickhandler = () => {
    socket.emit('leaveRoom', param.id);
    navigate(-1);
  };
  return (
    <div>
      <button onClick={onClickhandler}>뒤로가기</button>
    </div>
  );
};

export default Room;
