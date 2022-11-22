import styled from 'styled-components';
import ReadyUsers from './gameready/ReadyUsers';
import ReadyHeader from './gameready/ReadyHeader';
import ReadyButton from './gameready/ReadyButton';

const GameReady = () => {
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
          <ReadyButton>준비완료</ReadyButton>
        </ReadyButtonSection>

        <ReadyUsers />
      </div>
    </ReadyLayout>
  );
};

export default GameReady;

const ReadyLayout = styled.div`
  width: 100%;
  height: 100%;
  background-color: rosybrown;
`;

const ReadyButtonSection = styled.div`
  /* background-color: #4f9c64; */
  background-color: #cfcfcf;
  display: flex;
  flex-direction: column;
  margin: 32px auto;
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
  background-color: black;
  color: #ffffff;
  min-width: 6%;
  min-height: 40px;
  border-radius: 5px;
  text-align: center;
  font-size: 20px;

  display: table;
  margin: 0 auto 10px;
`;

const RoomInitials = styled.div`
  background-color: #ffffff;
  width: 90%;
  min-height: 40px;
  border-radius: 5px;
  font-size: 20px;
  margin: 0 auto 10px;
`;
