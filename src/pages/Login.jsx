import React from 'react';
import { KAKAO_AUTH_URL } from '../components/login/Oauth';
import styled from 'styled-components';
// import { socket } from "../shared/socket";
import Notice from '../elements/Notice';

// socket.emit("leave_Room", "하이하이");
// socket.emit("enter_Room", "하이하이");

// const handleMessageSubmit = (e) => {
//   e.preventDefaul();
// };

const Login = () => {
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <Wrap>
      <Notice />
      <MiniWrap>
        <P>WE ALL LION</P>
        <MainImg>
          <img src="/img/lion.png"></img>
        </MainImg>
        <KaKaoBtn onClick={handleLogin}>
          <img style={{ transform: 'scale(0.3)' }} src="/img/kakao1.png"></img>
          <span>카카오계정 로그인</span>
        </KaKaoBtn>
      </MiniWrap>
    </Wrap>
  );
};

export default Login;

const Wrap = styled.div`
  background-color: tomato;
`;

const MiniWrap = styled.div`
  background-color: green;
  position: absolute;
  left: 50%;
  margin-left: -50%;
`;

const P = styled.div`
  color: #000000;
  font-family: Pretendard, 'Source Sans Pro';
  font-size: 50px;
  font-weight: 800;
  white-space: nowrap;
  width: 28.2rem;
  background-color: pink;
`;

const KaKaoBtn = styled.div`
  height: 52px;
  padding: 11px 0px 10px;
  background: #ffcd2a;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 50%;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  margin-top: 32px;
  float: center;
  &:hover {
    background-color: #f4c31f;
  }
`;

const MainImg = styled.div`
  height: 360px;
  object-fit: contain;
  top: 188px;
  vertical-align: top;
  width: 1080px;
  background-color: gray;
`;
