import React from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getUser } from '../redux/modules/userSlice';
import { useState } from 'react';
import Notice from '../elements/Notice';

const UserInfo = ({ closeUseModal }) => {
  const token = localStorage.getItem('token');
  const [loginState, setLoginState] = useState(false);
  const UserModal = () => {
    closeUseModal();
  };
  const getUserInfo = useSelector((state) => state.user.data);
  console.log(getUserInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      setLoginState(true);
      dispatch(__getUser(token));
    }
  }, []);

  // const logoutHandler = () => {
  //   localStorage.clear();
  //   setLoginState(false);
  // };

  return (
    <>
      <ChatLayout>
        <UserNick>닉네임 :{getUserInfo.nickname}</UserNick>
      </ChatLayout>
    </>
  );
};
export default UserInfo;

const ChatLayout = styled.div`
  margin-top: 105px;
  /* width: 350px; */
  height: calc(30vh - 50px);
  min-height: 150px;
  min-width: 590px;
  background-color: #d99292;
  border-radius: 10px;
  /* position: relative; */
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  position: fixed;
  /* box-sizing: border-box; */
  left: 0;
  top: 0;
  width: 70%;
  /* z-index: 999; */
  /* opacity: 1; */
`;

const UserNick = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  color: black;
  background-color: orange;
  border-radius: 0 0 10px 10px;
  padding: 0;
`;
