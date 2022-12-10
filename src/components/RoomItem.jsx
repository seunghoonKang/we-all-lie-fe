import React, { useState } from 'react';
import { socket } from '../shared/socket';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getRoomInfo, getUserNickname } from '../redux/modules/roomSlice';
import { ReactComponent as UnLockedIcon } from '../assets/unlocked.svg';
import { ReactComponent as LockedIcon } from '../assets/locked.svg';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import Button from '../elements/Button';
import CommonModal from '../elements/CommonModal';

const RoomItem = ({ roominfo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies] = useCookies(['nickname']);
  const [checkRoomStatus, setCheckRoomStatus] = useState('');

  const enterRoomHandler = () => {
    if (roominfo?.currentCount > 8) {
      setCheckRoomStatus('정원초과');
      setTimeout(() => {
        setCheckRoomStatus('');
      }, 2000);
    } else if (roominfo?.roomStatus === true) {
      setCheckRoomStatus('게임중');
      setTimeout(() => {
        setCheckRoomStatus('');
      }, 2000);
    } else {
      socket.emit('enterRoom', roominfo?._id, cookies.nickname);
      dispatch(getRoomInfo(roominfo));
      // socket.on('userNickname', (userNickname) => {
      //   dispatch(getUserNickname(userNickname));
      // });
      setCheckRoomStatus('');
      navigate(`/room/${roominfo?._id}`);
    }
  };

  return (
    <RoomContainer>
      {checkRoomStatus === '정원초과' && (
        <CommonModal main="정원이 초과되었습니다." />
      )}
      {checkRoomStatus === '게임중' && (
        <CommonModal main="게임이 시작된 방입니다." />
      )}
      <RoomContents>
        <RoomContentsContainer>
          <div className="flex">
            <RoomNumDiv>{String(roominfo?._id).padStart(3, '00')}</RoomNumDiv>
            <RoomTitle>{roominfo?.roomTitle}</RoomTitle>
          </div>
          <RoomInfos>
            <div className="flex justify-center items-center mr-[8px] pl-[7px]">
              {/* {roominfo?.private && (
                <LockedIcon width="16" height="16" fill="none" />
              )} */}
              {<UnLockedIcon width="16" height="16" fill="none" />}
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
