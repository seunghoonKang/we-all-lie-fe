import React from 'react';
import { KAKAO_AUTH_URL } from '../components/login/Oauth';
import styled from 'styled-components';
// import { socket } from "../shared/socket";
import Notice from '../elements/Notice';
import Header from '../elements/Header';

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
    <div>
      <Notice />
      <Header />
      <KaKaoBtn onClick={handleLogin}>
        <img style={{ transform: 'scale(0.3)' }} src="/img/kakao1.png"></img>
        <span>카카오계정 로그인</span>
      </KaKaoBtn>
      <MainImg>메인 이미지</MainImg>
    </div>
  );
};

export default Login;

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
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  margin-top: 32px;
  float: right;
  &:hover {
    background-color: #f4c31f;
  }
`;

const MainImg = styled.div`
  position: absolute;
  width: 700px;
  height: 709px;
  left: 0px;
  top: 218px;
  margin: 0px 0px 0px 20px;
  background: rosybrown;
  border-radius: 20px;
`;
