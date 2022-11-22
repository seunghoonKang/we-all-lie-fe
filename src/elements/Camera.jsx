import { useState } from 'react';
import styled from 'styled-components';
import arrestedstamp from '../img/arrested.png';

const Camera = ({ person, num }) => {
  const onClickHandler = () => {
    console.log(num);
  };
  const [arrested, setArrested] = useState(false);
  const arrestedToggle = () => {
    setArrested((arrested) => !arrested);
  };
  console.log(arrested);
  return (
    <div>
      {/* <Wrap onClick={onClickHandler}> */}
      <Wrap arrested={arrested} onClick={arrestedToggle}>
        <NickName>무서운 승짱{person}</NickName>
        <Arrested arrested={arrested}>
          <img src={arrestedstamp} alt="투표 지목된 사람" />
        </Arrested>
      </Wrap>
    </div>
  );
};

export default Camera;

const Wrap = styled.div`
  width: 204px;
  height: 164px;
  background-color: #e8e8e8;
  border-radius: 5px;
  display: flex;
  flex-direction: row-reverse;
  border: 1px solid #2b2b2b;
  cursor: pointer;
  ${(props) => props.arrested && `position:relative`}
`;

const NickName = styled.div`
  width: 204px;
  height: 28px;
  background-color: #2b2b2b;
  color: white;
  align-self: flex-end;
  text-align: center;
  border-radius: 0px 0px 5px 5px;
`;

const Arrested = styled.div`
  ${(props) =>
    props.arrested
      ? `position:absolute; top:50px; left:20px; z-index:999;`
      : `display:none;`}
`;
