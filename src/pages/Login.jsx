import React from "react";
import { KAKAO_AUTH_URL } from "../components/login/Oauth";
import styled from "styled-components";
import { socket } from "../shared/socket";

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
      <KaKaoBtn onClick={handleLogin}>
        <img src="/img/kakao.png"></img>
        <span>카카오계정 로그인</span>
      </KaKaoBtn>
    </div>
  );
};

export default Login;

const KaKaoBtn = styled.div`
  height: 52px;
  padding: 11px 0px 10px;
  background: #ffcd2a;
  display: flex;
  /* -webkit-box-align: center; */
  align-items: center;
  /* -webkit-box-pack: center; */
  justify-content: center;
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  margin-top: 32px;
  &:hover {
    background-color: #f4c31f;
  }
`;
