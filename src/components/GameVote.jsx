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
    <Layout theme={themeContext}>
      <HeaderSection>
        📌 모든 유저가 투표를 완료하면 스파이의 정체가 공개됩니다!
      </HeaderSection>
      <Timer>
        <Time></Time>
      </Timer>
      <Vote>
        <VoteTitle>스파이를 검거하세요 !</VoteTitle>
        <VoteContent>
          스파이로 의심되는 유저의 화면을 클릭해 투표하세요.
        </VoteContent>
        <VoteButton>투표완료</VoteButton>
      </Vote>
      <Users userLength={userLength}>
        {userCameras.map((person) => (
          <Camera
            person={person.nickName}
            key={person.nickName}
            stamp={stamp}
            setStamp={setStamp}
          />
        ))}
      </Users>
    </Layout>
  );
};

export default GameVote;

const Layout = styled.div`
  width: 100%;
  position: relative;
  background-color: white;
  border-radius: 10px;
  padding: 16px;
  min-height: 650px;
  height: 90vh;
`;

const HeaderSection = styled.section`
  font-size: ${(props) => props.theme.fontSize.default};
  font-weight: 700;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 20px; ;
`;

const Time = styled.div``;
const Timer = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${(props) => props.theme.color.gray1};
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  ${Time} {
    width: 100%;
    height: 40px;
    background-color: ${(props) => props.theme.color.lionBlack};
    position: absolute;
    left: -50%;
  }
`;

const VoteButton = styled.button``;
const VoteTitle = styled.h2``;
const VoteContent = styled.h3``;
const Vote = styled.div`
  background-color: ${(props) => props.theme.color.gray1};
  width: 100%;
  min-height: 180px;
  height: 22vh;
  /* text-align: center; */
  margin-top: 2vh;
  margin-bottom: 2vh;
  padding: 30px 30px;
  /* padding-bottom: 60px; */
  border-radius: 6px;
  ${VoteTitle} {
    font-size: 22px;
    font-weight: 700;
    text-shadow: 2px 2px 1px #b7b7b7;
  }
  ${VoteContent} {
    margin-top: 10px;
  }
  ${VoteButton} {
    ${(props) => props.theme.button.buttonL}
    border: 1px solid ${(props) => props.theme.color.lionOrange};
    color: ${(props) => props.theme.color.lionOrange};
    font-weight: 700;
    margin-top: 20px;
  }
`;

const Users = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly; //가로 띄우기
  align-content: space-evenly; //세로 띄우기
  width: 100%;
  /* min-height: 384px; */
  /* min-height: 400px; */
  height: 50vh;
  min-height: 312px;
  /* background-color: pink; */
`;
