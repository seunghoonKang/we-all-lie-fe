import React, { useState } from "react";
import Chat from "../components/Chat";
import styled from "styled-components";

const Home = () => {
  //채팅방 열고 닫기 코드 (나중에 필요없으면 props들과 함께 지우기)
  const [showChat, setShowChat] = useState(false);

  return (
    <div>
      <div>상단 슬라이드</div>
      <Box showChat={showChat}>
        <List showChat={showChat}>여기에 룸 리스트</List>
        <Chat showChat={showChat} />
        {/* <Click onClick={() => {setShowChat(!showChat);}}>
          채팅창 열기/닫기
        </Click> */}
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
  width: 100%;
  /* //채팅방 열고닫기 코드...
  width: ${(props) => (props.showChat ? "calc(100% - 360px)" : "100%")};
  transition: all 400ms ease-in-out; */
  background-color: pink;
  height: 90vh;
  min-height: 650px;
  margin-bottom: 100px;
`;
