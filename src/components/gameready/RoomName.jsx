import React from 'react';
import styled from 'styled-components';

const RoomName = () => {
  return (
    <RoomNameLayout>
      <RoomNumber>001</RoomNumber>
      <RoomInitials>무서운 사자가 만든 무서운 방</RoomInitials>
    </RoomNameLayout>
  );
};

export default RoomName;

const RoomNameLayout = styled.div`
  background-color: orange;
  display: flex;
  justify-content: space-around;
`;
const RoomNumber = styled.div`
  background-color: black;
  color: #ffffff;
  min-width: 40px;
  min-height: 40px;
  border-radius: 5px;
  text-align: center;
  font-size: 20px;

  display: table;
  margin: 0 auto;
`;
const RoomInitials = styled.div`
  background-color: #ffffff;
  min-width: 823px;
  min-height: 40px;
  border-radius: 5px;
  font-size: 20px;
`;
