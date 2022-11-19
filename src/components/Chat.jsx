import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { socket } from '../shared/socket';
import { useRef } from 'react';
import { useCookies } from 'react-cookie';

//민형님 주소
import { io } from 'socket.io-client';

export const socket = io('http://3.36.1.72', {
  cors: {
    origin: 'http://localhost:3000',
  },
  transports: ['websocket', 'polling'],
});

const Chat = ({ showChat }) => {
  const [cookies, setCookie] = useCookies(['nickname']);
  const [chat, setChat] = useState([
    { notice: '뀨띠님이 입장하셨습니다' },
    { name: '뿡', msg: 'ㅋ' },
  ]);
  // console.log(cookies);
  const nickname = cookies.nickname;
  const msgInput = useRef();

  useEffect(() => {
    //로비 들어왔을 때
    //채팅방에 @@님이 로그인하셨습니다.(?) 띄워주기
    socket.emit(
      'enterLobby',
      nickname,
      () => {
        setChat([...chat, { notice: `${nickname}님이 입장하셨습니다` }]);
      },
      []
    );

    //남이 보낸 msg
    socket.on('receiveLobbyMsg', (msg) => {
      console.log(msg);
      setChat([...chat, msg]);
    });
  }, [socket]);
  //남이 보낸 msg
  socket.on('receiveLobbyMsg', (msg) => {
    console.log(msg);
    setChat([...chat, msg]);
  });

  //채팅방에 닉네임, 메세지 받기(on)
  //하쨩 : 승쨩어디감

  const myMsg = (a) => {
    setChat([...chat, a]);
  };

  const msgSubmitHandler = (e) => {
    e.preventDefault();
    const msgValue = msgInput.current.value;

    //채팅에 닉네임, 메세지 전송 (emit)
    const mine = { name: `${nickname}(Me)`, msg: `${msgValue}` };
    console.log(mine);

    //이건 socket.io 만들 때는 필요없는데 지금 내가 console에서 확인하려고~
    myMsg(mine);

    //내가 적은 msg
    //나를 제외한 모든 사람들한테 메세지를 보여주도록 emit
    socket.emit(
      'sendLobbyMsg',
      { name: `${nickname}`, msg: `${msgValue}` },
      () => {
        //나한테 띄워줄 내가 보낸 메세지 추가
        myMsg(mine);
      }
    );

    msgInput.current.value = '';
  };

  console.log(chat);
  return (
    <ChatLayout showChat={showChat}>
      <ChatTop>
        <p style={{ fontSize: '30px' }}>Chat</p>
        <People>(현재 접속 인원수)</People>
      </ChatTop>
      <ChatRow>
        <Notice>매너 채팅 안하면 벤먹는다!</Notice>
        <Msg>
          <Word>말풍선..</Word>
        </Msg>
        <Msg>
          <Word>말풍선..말풍선..말풍선..</Word>
        </Msg>
        <Msg>
          <Word>말풍선..</Word>
        </Msg>
        {chat.map((a) => {
          a.notice && <Notice>{a.notice}</Notice>;
          a.msg && (
            <Msg>
              <p>
                <img />
                <span>{a.name}</span>
              </p>
              <Word>{a.msg}</Word>
            </Msg>
          );
        })}
      </ChatRow>
      <Form onSubmit={msgSubmitHandler}>
        {/* <p>프로필?</p> */}
        <input type="text" ref={msgInput} placeholder="여따 할말혀!" />
        <button>전송</button>
      </Form>
    </ChatLayout>
  );
};

export default Chat;

const ChatLayout = styled.div`
  padding: 10px;
  width: 350px;
  height: 90vh;
  min-height: 650px;
  background-color: lightgray;

  /* //채팅방 열고 닫기 코드
  position: absolute;
  top: 0;
  ${(props) => (props.showChat ? 'right:0;' : 'right:-360px;')}
  visibility: ${(props) => (props.showChat ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.showChat ? '1' : '0')};
  transition: all 400ms ease-in-out;*/
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
    margin-right: 10px;
  }
`;
