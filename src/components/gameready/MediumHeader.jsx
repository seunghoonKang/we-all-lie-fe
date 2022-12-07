import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as UnockedIcon } from '../../assets/unlocked.svg';

const MediumHeader = () => {
  //게임 정보 있는 헤더
  const getRoomInfo = useSelector((state) => state.room.roomInfos);
  console.log(getRoomInfo);
  return (
    <RoomNameLayout>
      <RoomNumber>{String(getRoomInfo._id).padStart(3, '00')}</RoomNumber>
      <RoomInitials>{getRoomInfo.roomTitle}</RoomInitials>

      <RoomInfos>
        <InfoDiv>{getRoomInfo.currentCount} / 8 </InfoDiv>
        <InfoDiv>{getRoomInfo?.gameMode === false ? 'EASY' : 'HARD'}</InfoDiv>
        <div className="flex justify-center items-center mr-[8px] pl-[7px]">
          <UnockedIcon width="16" height="16" fill="none" />
        </div>
      </RoomInfos>
    </RoomNameLayout>
  );
};

export default MediumHeader;

const RoomNameLayout = styled.div`
  background-color: #222222;
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const RoomNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  color: #ffffff;
  width: 31%;
  min-height: 40px;
  border-radius: 5px;
  font-size: 20px;
  padding-left: 5px;
  margin: 0 auto 10px;
  background-color: pink;
`;

const RoomInfos = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: row;
  margin-left: 7px;
  font-weight: 700;
  font-weight: 700;
  align-items: center;
  background-color: orange;
`;

const InfoDiv = styled.div`
  padding: 2px 10px 2px 10px;
  border: 1px solid;
  font-size: ${(props) => props.theme.fontSize.xs};
  color: ${(props) => props.theme.color.gray1};
  border-color: ${(props) => props.theme.color.gray1};
  border-radius: 20px;
`;
