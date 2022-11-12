import React, { useState } from 'react';
import CreateRoom from '../components/createroom/CreateRoom';
import RoomItem from '../components/RoomItem';
import Chat from '../components/Chat';

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <div>상단 슬라이드</div>
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

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <RoomItem />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
