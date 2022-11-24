import styled from 'styled-components';
// import ReadyUsers from './gameready/ReadyUsers';
import ReadyHeader from './gameready/ReadyHeader';
import ReadyButton from './gameready/ReadyButton';
import Camera from '../elements/Camera';
import { useState } from 'react';

const GameReady = () => {
  const userCameras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const userLength = userCameras.length;
  const [ready, useReady] = useState(false);

  const ReadyHendler = () => {
    useReady(!ready);
  };
  return (
    <ReadyLayout>
      <div>
        <ReadyHeader />

        <RoomNameLayout>
          <RoomNumber>{String(3).padStart(3, '00')}</RoomNumber>
          <RoomInitials>무서운 사자가 만든 무서운 방</RoomInitials>
        </RoomNameLayout>

        <ReadyButtonSection>
          <h1>준비 버튼을 클릭하세요 ! </h1>
          <span>모든 플레이어가 준비되면 자동으로 게임이 시작됩니다.</span>
          <div onClick={ReadyHendler}>
            <ReadyButton>준비완료</ReadyButton>
          </div>
        </ReadyButtonSection>

        <Users userLength={userLength}>
          {userCameras.map((person, index) =>
            !ready ? (
              <Camera />
            ) : (
              <ReadyWrap>
                <img
                  // style={{ transform: 'scale(0.3)' }}
                  src="/img/ready.png"
                ></img>
                <ReadyNickName>게으른 뀨띠</ReadyNickName>
              </ReadyWrap>
            )
          )}
        </Users>
      </div>
    </ReadyLayout>
  );
};

export default GameReady;

const ReadyLayout = styled.div`
  width: 100%;
  height: 100%;
  background-color: #cfcfcf;
`;

const ReadyButtonSection = styled.div`
  /* background-color: #4f9c64; */
  background-color: #cfcfcf;
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  align-items: center;
  gap: 5px;
  h1 {
    /* background-color: white; */
    font-size: 22px;
  }
  span {
    /* background-color: pink; */
    font-size: 16px;
    color: #2b2b2b;
    margin: 0px 0px 27px;
  }
`;

const RoomNameLayout = styled.div`
  background-color: #cfcfcf;
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const RoomNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: #ffffff;
  align-content: center;
  min-width: 6%;
  min-height: 40px;
  border-radius: 5px;
  text-align: center;
  font-size: 20px;
  margin: 0 auto 10px;
`;

const RoomInitials = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  width: 90%;
  min-height: 40px;
  border-radius: 5px;
  font-size: 20px;
  padding-left: 5px;
  margin: 0 auto 10px;
`;

const Users = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  flex-wrap: wrap;
  gap: 16px 16px;
  border-radius: 5px;
  padding: 16px;
  background-color: white;
`;

const ReadyWrap = styled.div`
  width: 204px;
  height: 164px;
  background-color: #e8e8e8;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1.5px solid #ff8217;
  img {
    align-self: flex-start;
    margin: 5px;
  }
`;

const ReadyNickName = styled.div`
  width: 202px;
  height: 28px;
  background-color: #ff8217;
  align-self: flex-end;
  text-align: center;
  border-radius: 0px 0px 5px 5px;
`;
