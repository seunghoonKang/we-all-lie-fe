import React from 'react';
import styled from 'styled-components';

const RoomItem = () => {
  return (
    <RoomContainer>
      <div>001</div>
      <RoomContents>
        <RoomTitle>방제목 입니다 방제목 입니다</RoomTitle>
        <RoomInfos>
          <p>2/8</p>
          <p>자</p>
          <p>EASY</p>
          <p>게임중</p>
        </RoomInfos>
      </RoomContents>
      <div>화살표</div>
    </RoomContainer>
  );
};

const RoomContainer = styled.div`
  display: flex;
  width: 862px;
  height: 116px;
  background-color: rgba(217, 217, 217, 0.1);
  padding-top: 19px;
  padding-left: 33px;
  border-radius: 10px;
`;

const RoomContents = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoomTitle = styled.div`
  padding-left: 49px;
  font-weight: 700;
`;

const RoomInfos = styled.div`
  display: flex;
  padding-left: 49px;
`;

export default RoomItem;
