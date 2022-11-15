import React from 'react';
import styled from 'styled-components';
import { socket } from '../shared/socket';
import { useRef } from 'react';

const Chat = ({ showChat }) => {
  const msgInput = useRef();
  // const msgValue = msgInput.current.value;

  //로비 입장시, 닉네임 받아오기(on)
  //채팅방에 @@님이 로그인하셨습니다.(?) 띄워주기

  //채팅방에 닉네임, 메세지 받기(on)
  //하쨩 : 승쨩어디감

  const msgSubmitHandler = (e) => {
    e.preventDefault();
    //채팅에 닉네임, 메세지 전송 (emit)
    //You : 하쨩 하이

    msgInput.current.value = '';
  };

  return (
    <ChatLayout showChat={showChat}>
      <ChatTop>
        <p style={{ fontSize: '30px' }}>Chat</p>
        <People>(현재 접속 인원수)</People>
      </ChatTop>
      <ChatRow>
        <Notice>공지글</Notice>
        <Msg>
          <Word>말풍선..</Word>
        </Msg>
        <Msg>
          <Word>말풍선..말풍선..말풍선..</Word>
        </Msg>
        <Msg>
          <Word>말풍선..</Word>
        </Msg>
      </ChatRow>
      <Form onSubmit={msgSubmitHandler}>
        {/* <p>프로필?</p> */}
        <input type="text" ref={msgInput} placeholder="Msg..." />
        <button>전송</button>
      </Form>
    </ChatLayout>
  );
};

export default Chat;

const ChatLayout = styled.div`
  padding: 10px;
  width: 360px;
  height: 90vh;
  min-height: 650px;
  background-color: lightgray;
  transition: all 400ms ease-in-out;
  /* //채팅방 열고 닫기 코드
  position: absolute;
  top: 0;
  ${(props) => (props.showChat ? 'right:0;' : 'right:-360px;')}
  visibility: ${(props) => (props.showChat ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.showChat ? '1' : '0')}; */
`;

const People = styled.p``;
const ChatTop = styled.div`
  display: flex;
  justify-content: space-between;
  height: 8%;
  padding: 0 10px;
  p {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ${People} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Notice = styled.div``;
const Msg = styled.div``;
const Word = styled.p``;
const ChatRow = styled.div`
  background-color: lightgreen;
  width: 100%;
  height: 85%;

  ${Notice} {
    text-align: center;
    padding: 5px;
    color: gray;
  }

  ${Msg} {
    margin: 5px;
  }

  ${Word} {
    display: inline-block;
    background-color: white;
    padding: 2px 6px;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 3%;
  height: 5%;
  min-height: 36px;
  p {
    padding: 5px 0;
  }
  input {
    width: 80%;
    padding: 0 5px;
    &:focus {
      outline: none;
    }
  }
  button {
    background-color: pink;
    padding: 5px;
    border-radius: 8px;
  }
`;
