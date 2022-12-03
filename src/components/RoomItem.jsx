import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getRoomInfo } from '../redux/modules/roomSlice';
import { socket } from '../shared/socket';

const RoomItem = ({ roominfo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const enterRoomHandler = () => {
    if (roominfo?.currentCount > 8) {
      alert('정원이 초과되었습니다.');
    } else {
      socket.emit('enterRoom', roominfo?._id);
      dispatch(getRoomInfo(roominfo));
      navigate(`/room/${roominfo?._id}`);
    }
  };
  console.log(roominfo);
  return (
    <RoomContainer>
      <RoomContents>
        <RoomContentsContainer>
          <div className="flex">
            <div>{String(roominfo?._id).padStart(3, '00')}</div>
            <RoomTitle>{roominfo?.roomTitle}</RoomTitle>
          </div>
          <RoomInfos>
            <div className="h-[20px] bg-[#a13e3e80]">자물쇠</div>
            <div className="h-[20px] bg-[#a13e3e80]">
              {roominfo?.currentCount} / 8{' '}
            </div>
            <div className="h-[20px] bg-[#a13e3e80]">
              {roominfo?.gameMode === false ? 'EASY' : 'HARD'}
            </div>
            <div className="h-[20px] bg-[#a13e3e80]">
              {roominfo?.roomStatus === false ? '대기중' : '게임중'}
            </div>
          </RoomInfos>
        </RoomContentsContainer>
      </RoomContents>
      <div
        className="cursor-pointer w-[78px] h-[36px] bg-slate-600 flex justify-center items-center mr-[20px] mt-[10px]"
        onClick={enterRoomHandler}
      >
        입장하기
      </div>
    </RoomContainer>
  );
};

const RoomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  background-color: rgba(89, 79, 79, 0.1);
  padding-top: 8px;
  padding-left: 33px;
  border-radius: 10px;
  margin-top: 8px;
`;

const RoomContents = styled.div`
  display: flex;
`;

const RoomTitle = styled.div`
  margin-left: 7px;
  font-weight: 700;
`;

const RoomContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoomInfos = styled.div`
  display: flex;
  gap: 5px;
`;

export default RoomItem;
