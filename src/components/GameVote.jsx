import React from 'react';
import styled from 'styled-components';
import Camera from '../elements/Camera';

const GameVote = () => {
  const userCameras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const userLength = userCameras.length;
  return (
    <Layout>
      <HeaderSection>
        <HeaderTitle>
          📌 모든 유저가 투표를 완료하면 스파이의 정체가 공개됩니다!
        </HeaderTitle>
        {/* <MakeRoomBtn>방 나가기</MakeRoomBtn> */}
      </HeaderSection>
      <Vote>
        <VoteTitle>스파이를 검거하세요</VoteTitle>
        <VoteContent>
          스파이로 의심되는 유저의 화면을 클릭해 투표하세요.
        </VoteContent>
        <Timer>00:45</Timer>
      </Vote>
      <Users userLength={userLength}>
        {userCameras.map((person, index) => (
          <Camera key={index} person={person} />
        ))}
      </Users>
    </Layout>
  );
};

export default GameVote;

const Layout = styled.div`
  width: 100%;
  position: relative;
`;
const HeaderSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: #ff8217;
  border-radius: 10px;
  width: 97%;
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 999;
`;

const HeaderTitle = styled.div`
  margin-left: 16px;
`;

const MakeRoomBtn = styled.button`
  width: 96px;
  height: 36px;
  margin-right: 18px;
  background-color: #d9d9d9;
`;

const Users = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px 16px;
  /* ${(props) =>
    props.userLength < 5
      ? `50%`
      : `calc(35% / ((${props.userLength} - 3) * 2))`}; */
  padding: 16px;
  background-color: white;
`;

const VoteTitle = styled.h2``;
const VoteContent = styled.h3``;
const Timer = styled.div``;
const Vote = styled.div`
  background-color: lightgray;
  width: 100%;
  text-align: center;
  padding-bottom: 40px;
  position: relative;
  ${VoteTitle} {
    font-size: 22px;
    font-weight: 700;
    text-shadow: 2px 2px 1px #b7b7b7;
    padding-top: 140px;
  }
  ${VoteContent} {
    margin-top: 10px;
    padding-bottom: 20px;
  }
  ${Timer} {
    width: 220px;
    height: 40px;
    font-size: 22px;
    line-height: 22px;
    padding: 9px 0;
    color: white;
    background-color: black;
    border-radius: 10px 10px 0 0;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;
