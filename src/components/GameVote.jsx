import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Camera from '../elements/Camera';
import { socket } from '../shared/socket';

const GameVote = () => {
  const themeContext = useContext(ThemeContext);
  const userCameras = [
    { nickName: 'a' },
    { nickName: 'b' },
    { nickName: 'c' },
    { nickName: 'd' },
    { nickName: 'e' },
    { nickName: 'f' },
    { nickName: 'g' },
    { nickName: 'h' },
  ];
  const userLength = userCameras.length;
  const [stamp, setStamp] = useState();
  socket.emit('voteSpy', '뀨띠', () => {
    //
  });

  return (
    <Layout>
      <HeaderSection theme={themeContext}>
        <HeaderTitle>
          📌 모든 유저가 투표를 완료하면 스파이의 정체가 공개됩니다!
        </HeaderTitle>
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
          // <User onClick={arrestedToggle} key={index} value={index}>
          <Camera
            person={person.nickName}
            key={person.nickName}
            index={index}
            stamp={stamp}
            setStamp={setStamp}
          />
          //   <Arrested arrested={arrested}>
          //     <img src={arrestedstamp} alt="투Arresopen=ted" />
          //   </Arrested>
          // </User>
        ))}
      </Users>
      {/* <Examples></Examples> */}
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
  background-color: ${(props) => props.theme.color.lionOrange};
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

const VoteTitle = styled.h2``;
const VoteContent = styled.h3``;
const Timer = styled.div``;
const Vote = styled.div`
  background-color: lightgray;
  width: 100%;
  min-height: 280px;
  height: 40vh;
  text-align: center;
  padding-top: 140px;
  padding-bottom: 60px;
  position: relative;
  ${VoteTitle} {
    font-size: 22px;
    font-weight: 700;
    text-shadow: 2px 2px 1px #b7b7b7;
  }
  ${VoteContent} {
    margin-top: 10px;
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

const User = styled.div``;
const Users = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; //가로 띄우기
  align-content: space-between; //세로 띄우기
  min-height: 384px;
  height: 50vh;
  gap: 16px;
  padding: 16px;
  background-color: white;
  ${User} {
    width: 204px;
    height: 164px;
    /* width: 100%; */
    position: relative;
    /* background-color: green; */
  }
`;
const Arrested = styled.div`
  ${(props) =>
    props.arrested
      ? `position:absolute; top:30px; left:20px; z-index:999;`
      : `display:none;`}
`;

const Examples = styled.div`
  width: 100%;
  min-height: 384px;
  background-color: white;
`;
