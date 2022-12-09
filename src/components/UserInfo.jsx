import React from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';

const UserInfo = ({ closeUseModal, token }) => {
  const UserModal = () => {
    closeUseModal();
  };

  return (
    <div>
      <BackgroundUser onClick={UserModal}>
        {/* <Test> 하쨩이 만든 유저</Test> */}
      </BackgroundUser>
    </div>
  );
};
export default UserInfo;

const BackgroundUser = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
`;

const Test = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 192px;
  height: 150px;
  color: black;
  background-color: #fff;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 20px 60px -2px rgb(27 33 58 / 40%);
  padding: 0;
`;
