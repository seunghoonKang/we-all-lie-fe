import React, { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import { getRoomInfo, getUserNickname } from '../redux/modules/roomSlice';
import { socket } from '../shared/socket';
import { ReactComponent as UnockedIcon } from '../assets/unlocked.svg';
import Button from '../elements/Button';

const RoomItem = ({ roominfo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeContext = useContext(ThemeContext);
  const enterRoomHandler = () => {
    if (roominfo?.currentCount > 8) {
      alert('정원이 초과되었습니다.');
    } else {
      socket.emit('enterRoom', roominfo?._id);
      dispatch(getRoomInfo(roominfo));
      socket.on('userNickname', (userNickname) => {
        dispatch(getUserNickname(userNickname));
      });
      navigate(`/room/${roominfo?._id}`);
    }
  };

  return (
    <RoomContainer theme={themeContext}>
      <RoomContents>
        <RoomContentsContainer>
          <div className="flex">
            <RoomNumDiv>{String(roominfo?._id).padStart(3, '00')}</RoomNumDiv>
            <RoomTitle>{roominfo?.roomTitle}</RoomTitle>
          </div>
          <RoomInfos>
            <div className="flex justify-center items-center mr-[8px] pl-[7px]">
              <UnockedIcon width="16" height="16" fill="none" />
            </div>
            <InfoDiv>{roominfo?.currentCount} / 8 </InfoDiv>
            <InfoDiv>{roominfo?.gameMode === false ? 'EASY' : 'HARD'}</InfoDiv>
            <InfoDiv>
              {roominfo?.roomStatus === false ? '대기중' : '게임중'}
            </InfoDiv>
          </RoomInfos>
        </RoomContentsContainer>
      </RoomContents>
      <Button
        type={'button'}
        addStyle={{
          width: '80px',
          height: '40px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#222',
        }}
        onClick={enterRoomHandler}
      >
        입장하기
      </Button>
    </RoomContainer>
  );
};

const RoomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 70px;
  background-color: ${(props) => props.theme.color.white};

  padding-left: 20px;
  padding-right: 17px;
  border-radius: 10px;
  margin-top: 8px;
`;

const RoomContents = styled.div`
  display: flex;
`;

const RoomNumDiv = styled.div`
  font-size: ${(props) => props.theme.fontSize.default};
  font-weight: 700;
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

const InfoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 10px 2px 10px;
  border: 1px solid;
  font-size: ${(props) => props.theme.fontSize.xs};
  color: ${(props) => props.theme.color.gray3};
  border-color: ${(props) => props.theme.color.gray3};
  border-radius: 20px;
`;

export default RoomItem;
