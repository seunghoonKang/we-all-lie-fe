import { useState } from 'react';
import styled from 'styled-components';
import arrestedstamp from '../img/arrested.png';

const Camera = ({ person }) => {
  const [arrested, setArrested] = useState(false);
  const arrestedToggle = () => {
    setArrested((arrested) => !arrested);
  };
  console.log(arrested);
  return (
    <div>
      <Wrap arrested={arrested} onClick={arrestedToggle}>
        불만이야? 응<Ready>Ready</Ready>
        <NickName>무서운 사자얌{person}</NickName>
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
  background-color: #5c5757;
  cursor: pointer;
  ${(props) => props.arrested && `position:relative`}
`;
const Ready = styled.div`
  width: 52px;
  height: 20px;
  background-color: #5c5757;
`;

const NickName = styled.div`
  width: 204px;
  height: 28px;
  background-color: #8d8585;
`;

const Arrested = styled.div`
  ${(props) =>
    props.arrested
      ? `position:absolute; top:50px; left:20px; z-index:999;`
      : `display:none;`}
`;
