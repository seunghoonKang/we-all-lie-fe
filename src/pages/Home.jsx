import React, { useEffect, useState, useContext } from 'react';
import { useCookies } from 'react-cookie';
import CreateRoom from '../components/createroom/CreateRoom';
import RoomItem from '../components/RoomItem';
import Notice from '../elements/Notice';
import Chat from '../components/Chat';
import styled from 'styled-components';
import { socket } from '../shared/socket';
import { useBeforeunload } from 'react-beforeunload';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as WeAllLieWhiteLogo } from '../assets/we_all_lie_white_logo.svg';
import { useDispatch } from 'react-redux';
import { gameOperation } from '../redux/modules/gameSlice';

const Home = () => {
  //채팅방 열고 닫기 코드 (나중에 필요없으면 props들과 함께 지우기)
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [rooms, setRooms] = useState();
  const [cookies] = useCookies(['nickname']);
  const nickname = cookies['nickname'];
  const navigate = useNavigate('');

  // //새로고침방지
  useBeforeunload((event) => event.preventDefault());

  // socket.on('showRoom', (room) => {
  //   setRooms(room);
  //   //console.log(rooms);
  // });

  useEffect(() => {
    socket.on('showRoom', (room) => {
      setRooms(room);
      //console.log(rooms);
    });
  }, []);

  useEffect(() => {
    socket.on('showRoom', (room) => {
      setRooms(room);
      //console.log(rooms);
    });
  }, [rooms]);

  // setInterval(() => {
  //   socket.on('showRoom', (room) => {
  //     setRooms(room);
  //     console.log(rooms);
  //   });
  // }, 1000);

  useEffect(() => {
    dispatch(gameOperation(0));
  }, []);

  useEffect(() => {
    socket.emit('getNickname', nickname);

    //로그인 안하면 로비입장 못하게 하기 (useEffect 안에 넣어야 navigate 먹어요)
    if (cookies.nickname == null) {
      alert('로그인이 필요합니다');
      navigate(`/`);
    }
  }, [cookies.nickname, navigate, nickname]);

  //로비 입장 못하는 alert 뒤에 화면 안보이게 처리하려고.
  if (cookies.nickname == null) {
  } else {
    return (
      <div>
        <Notice />
        <Box>
          <List>
            <HeaderSection>
              <LogoImg>
                <WeAllLieWhiteLogo />
              </LogoImg>
            </HeaderSection>

            {openModal ? (
              <CreateRoom closeModal={() => setOpenModal(!openModal)} />
            ) : (
              <></>
            )}
            <FilterContainer>
              <div className="flex gap-[10px]">
                <FilteredRoomChoice>ALL</FilteredRoomChoice>
                <FilteredRoom>EASY</FilteredRoom>
                <FilteredRoom>HARD</FilteredRoom>
              </div>
              <div>
                <MakeRoomBtn onClick={() => setOpenModal(!openModal)}>
                  방 만들기
                </MakeRoomBtn>
              </div>
            </FilterContainer>
            <section>
              {rooms?.map((roomList) => {
                return <RoomItem roominfo={roomList} key={roomList._id} />;
              })}
            </section>
          </List>
          <Chat />
        </Box>
      </div>
    );
  }
};

export default Home;

const Box = styled.div`
  display: flex; //채팅방 열고 닫기 구현하면 display:flex 없애야함
  justify-content: space-between;
  padding: 16px;
`;

const List = styled.div`
  width: calc(100% - 350px);
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

const LogoImg = styled.div``;

const MakeRoomBtn = styled.button`
  width: 110px;
  height: 40px;

  border: 1px solid;
  border-radius: 6px;
  color: ${(props) => props.theme.color.lionOrange};
  border-color: ${(props) => props.theme.color.lionOrange};
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 60px;
  width: 100%;
`;

const FilteredRoomChoice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 80px;
  min-height: 40px;
  background: ${(props) => props.theme.color.lionOrange};
  color: ${(props) => props.theme.color.white};
  border: 1px solid;
  border-color: ${(props) => props.theme.color.lionOrange};
  border-radius: 6px;
  font-size: ${(props) => props.theme.fontSize.sm};
  font-weight: 400;
`;

const FilteredRoom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 80px;
  min-height: 40px;
  color: ${(props) => props.theme.color.white};
  border: 1px solid;
  border-color: ${(props) => props.theme.color.white};
  border-radius: 6px;
  font-size: ${(props) => props.theme.fontSize.sm};
  font-weight: 400;
`;
