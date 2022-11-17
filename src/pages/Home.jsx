import React, { useEffect, useState } from 'react';
import CreateRoom from '../components/createroom/CreateRoom';
import RoomItem from '../components/RoomItem';
import Chat from '../components/Chat';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addRoomLists } from '../redux/modules/roomSlice';
import { socket } from '../shared/socket';
const Home = () => {
  //채팅방 열고 닫기 코드 (나중에 필요없으면 props들과 함께 지우기)
  const [showChat, setShowChat] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const roomLists = useSelector((state) => state.roomSlice.roomList);

  useEffect(() => {
    socket.on('createRoom', (makeRoom) => {
      dispatch(addRoomLists(makeRoom));
    });
  });

  //console.log(roomLists?.payload);
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
          {roomLists?.map((roomList) => {
            <RoomItem roominfo={roomList.payload} />;
          })}
        </List>
        <Chat showChat={showChat} />
        {/* //채팅방 열고 닫기 버튼 
        <Click onClick={() => { setShowChat(!showChat); }}></Click> */}
      </Box>
    </div>
  );
};

export default Home;

// const Click = styled.button`
//   position: absolute;
//   top: 40px;
//   left: 20px;
//   background-color: lightgray;
//   padding: 10px;
// `;

const Box = styled.div`
  display: flex; //채팅방 열고 닫기 구현하면 display:flex 없애야함
  justify-content: space-between;
  /* //채팅방 열고닫기 버튼 생기면 쓰기,,
  position: relative; */
`;

const List = styled.div`
  width: calc(100% - 350px);
  /* //채팅방 열고닫기 코드...
  width: ${(props) => (props.showChat ? 'calc(100% - 360px)' : '100%')};
  transition: all 400ms ease-in-out; */
  background-color: pink;
  height: 90vh;
  min-height: 650px;
  margin-bottom: 100px;
`;
