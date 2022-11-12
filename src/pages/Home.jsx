import React, { useState } from 'react';
import CreateRoom from '../components/createroom/CreateRoom';
import RoomItem from '../components/RoomItem';
import Chat from '../components/Chat';
import styled from 'styled-components';

const Home = () => {
  const [showChat, setShowChat] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <div>상단 슬라이드</div>
      <Box showChat={showChat}>
        <List>
          <div>
            <button
              onClick={() => {
                setOpenModal(!openModal);
              }}
            >
              방 만들기
            </button>
          </div>
          {openModal ? (
            <CreateRoom closeModal={() => setOpenModal(!openModal)} />
          ) : (
            <></>
          )}
          <RoomItem />
        </List>
        <Chat showChat={showChat} />
        <Click
          onClick={() => {
            setShowChat(!showChat);
          }}
        >
          채팅창 열기/닫기
        </Click>
      </Box>
    </div>
  );
};

const Click = styled.button`
  position: absolute;
  top: 40px;
  left: 20px;
  background-color: lightgray;
  padding: 10px;
`;

const Box = styled.div`
  display: ${(props) => (props.showChat ? 'flex' : 'block')};
  justify-content: space-between;
  position: relative;
`;

const List = styled.div`
  width: 100%;
  background-color: pink;
  height: 90vh;
  min-height: 650px;
  margin-bottom: 100px;
`;

export default Home;
