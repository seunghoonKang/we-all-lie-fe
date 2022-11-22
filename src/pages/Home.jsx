import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import CreateRoom from '../components/createroom/CreateRoom';
import RoomItem from '../components/RoomItem';
import Notice from '../elements/Notice';
import Chat from '../components/Chat';
import styled from 'styled-components';
import { socket } from '../shared/socket';
import { useBeforeunload } from 'react-beforeunload';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  //채팅방 열고 닫기 코드 (나중에 필요없으면 props들과 함께 지우기)
  const [showChat, setShowChat] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [rooms, setRooms] = useState();
  const [cookies, setCookies] = useCookies(['nickname']);
  const nickname = cookies['nickname'];
  const navigate = useNavigate('');

  // //새로고침방지
  useBeforeunload((event) => event.preventDefault());

  useEffect(() => {
    socket.on('showRoom', (room) => {
      setRooms(room);
      console.log(rooms);
    });
  }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     socket.on('showRoom', (room) => {
  //       setRooms(room);
  //       console.log(rooms);
  //     });
  //   }, 100);
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  useEffect(() => {
    socket.emit('getNickname', nickname);

    //로그인 안하면 로비입장 못하게 하기 (useEffect 안에 넣어야 navigate 먹어요)
    if (cookies.nickname === undefined || null) {
      alert('로그인해주세요');
      navigate(`/`);
    }
  }, []);

  socket.on('userCount', (user) => console.log(user));

  //console.log(rooms);

  //로비 입장 못하는 alert 뒤에 화면 안보이게 처리하려고.
  //= 로그인 한 사람한테만 로비 보여주려고. => room이나 user 페이지에서도 처리해야함 ㅠ

  if (cookies.nickname === undefined || null) {
  } else {
    return (
      <div>
        <Notice />
        <Box showChat={showChat}>
          <List>
            <HeaderSection>
              <LogoImg>아마도이미지</LogoImg>
              <MakeRoomBtn
                onClick={() => {
                  setOpenModal(!openModal);
                }}
              >
                방 만들기
              </MakeRoomBtn>
            </HeaderSection>

            {openModal ? (
              <CreateRoom closeModal={() => setOpenModal(!openModal)} />
            ) : (
              <></>
            )}
            <FilterContainer>
              <div className="flex ml-[10px] gap-[10px]">
                <div className="w-[96px] h-[40px] border-solid border-black border-[0.5px] flex items-center justify-center cursor-pointer">
                  ALL
                </div>
                <div className="w-[96px] h-[40px] border-solid border-black border-[0.5px] flex items-center justify-center cursor-pointer">
                  EASY
                </div>
                <div className="w-[96px] h-[40px] border-solid border-black border-[0.5px] flex items-center justify-center cursor-pointer">
                  HARD
                </div>
              </div>
              <div className="flex gap-1 mr-[27px]">
                <div>img</div>
                <div>{rooms?.length}</div>
              </div>
            </FilterContainer>
            <RoomsContainer>
              {rooms?.map((roomList, index) => {
                return <RoomItem roominfo={roomList} key={index} />;
              })}
            </RoomsContainer>
          </List>
          <Chat showChat={showChat} />
          {/* //채팅방 열고 닫기 버튼 
        <Click onClick={() => { setShowChat(!showChat); }}></Click> */}
        </Box>
      </div>
    );
  }
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
`;

const LogoImg = styled.div`
  margin-left: 16px;
`;

const MakeRoomBtn = styled.button`
  width: 96px;
  height: 36px;
  margin-right: 18px;
  background-color: #d9d9d9;
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 60px;
  border-top: 0.5px solid black;
  border-bottom: 0.5px solid black;
  width: 100%;
`;

const RoomsContainer = styled.section`
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
`;
