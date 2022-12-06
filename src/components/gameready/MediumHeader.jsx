import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Field } from 'formik';

const HeaderSection = () => {
  //게임 정보 있는 헤더
  const getRoomInfo = useSelector((state) => state.room.roomInfos);
  // console.log(getRoomInfo);
  return (
    <RoomNameLayout>
      <RoomNumber>{String(getRoomInfo._id).padStart(3, '00')}</RoomNumber>
      <RoomInitials>{getRoomInfo.roomTitle}</RoomInitials>
      <label
        type="radio"
        name="gameMode"
        value={false}
        id="EASY"
        className="text-white appearance-none"
      >
        EASY
      </label>
    </RoomNameLayout>
  );
};

export default HeaderSection;

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
  width: 90%;
  min-height: 40px;
  border-radius: 5px;
  font-size: 20px;
  padding-left: 5px;
  margin: 0 auto 10px;
`;
