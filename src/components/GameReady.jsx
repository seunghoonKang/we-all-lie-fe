import styled from 'styled-components';
import RoomName from './gameready/RoomName';
import ReadyUsers from './gameready/ReadyUsers';

const GameReady = () => {
  return (
    <ReadyLayout>
      <div>
        <RoomName />
        준비하기
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
