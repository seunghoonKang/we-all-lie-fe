import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as LockedIcon } from '../../assets/locked_white.svg';
import { ReactComponent as UnlockedIcon } from '../../assets/unlocked_white.svg';

const MediumHeader = ({}) => {
  //게임 정보 있는 헤더
  const getRoomInfo = useSelector((state) => state.room.roomInfos);
  // console.log(getRoomInfo);
  return (
    <RoomNameLayout>
      <RoomNumber>{String(getRoomInfo._id).padStart(3, '00')}</RoomNumber>
      <RoomInitials>{getRoomInfo.roomTitle}</RoomInitials>

      <RoomInfos>
        <InfoDiv>{getRoomInfo.currentCount} / 8 </InfoDiv>
        <InfoDiv>{getRoomInfo?.gameMode === false ? 'EASY' : 'HARD'}</InfoDiv>
        <div className="flex justify-center items-center mr-[8px] pl-[7px]">
          {getRoomInfo.private == null ? (
            <UnlockedIcon width="16" height="16" fill="none" />
          ) : (
            <LockedIcon width="16" height="16" fill="none" />
          )}
        </div>
      </RoomInfos>
    </RoomNameLayout>
  );
};

export default MediumHeader;

const RoomNameLayout = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  margin: 0 1vh 0.5%;
`;

const RoomNumber = styled.div`
  display: flex;
  display: inline;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 16px;
  margin: 0px 10px;
`;

const RoomInitials = styled.div`
  display: flex;
  display: inline;
  align-items: center;
  color: #ffffff;
  font-size: 16px;
  padding-left: 5px;
  margin: 5px 10px;
`;

const RoomInfos = styled.div`
  display: flex;
  gap: 5px;
  margin-left: 7px;
  font-weight: 700;
  font-weight: 700;
`;

const InfoDiv = styled.div`
  padding: 2px 10px 2px 10px;
  border: 1px solid;
  font-size: ${(props) => props.theme.fontSize.xs};
  color: ${(props) => props.theme.color.gray1};
  border-color: ${(props) => props.theme.color.gray1};
  border-radius: 20px;
`;
