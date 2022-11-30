import { useState } from 'react';
import styled from 'styled-components';
import arrestedstamp from '../img/arrested.png';

const Camera = ({ person, stamp, setStamp }) => {
  const arrestedToggle = () => {
    setStamp(person);
  };
  console.log(person);
  // console.log(index);
  return (
    <Wrap onClick={arrestedToggle}>
      <NickName>무서운 승짱{person}</NickName>
      {stamp === person && (
        <Arrested>
          <img src={arrestedstamp} alt="투표 지목된 사람" />
        </Arrested>
      )}
    </Wrap>
  );
};

export default Camera;

const Wrap = styled.div`
  /* width: 204px; */
  width: 24%;
  height: 45%;
  min-height: 164px;
  /* height: auto; */
  background-color: #e8e8e8;
  border-radius: 5px;
  display: flex;
  flex-direction: row-reverse;
  border: 1px solid #2b2b2b;
  cursor: pointer;
  position: relative;
`;

const NickName = styled.div`
  /* width: 204px; */
  width: 100%;
  height: 28px;
  background-color: #2b2b2b;
  color: white;
  align-self: flex-end;
  text-align: center;
  border-radius: 0px 0px 5px 5px;
`;

const Arrested = styled.div`
  position: absolute;
  top: 50px;
  left: 20px;
  z-index: 999;
`;
