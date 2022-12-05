import { useState } from 'react';
import styled from 'styled-components';
import arrestedstamp from '../img/arrested.png';

const Camera = ({ person, stamp, setStamp }) =>
  // { person, stamp, setStamp }
  {
    const arrestedToggle = () => {
      setStamp(person);
    };
    //console.log(person);

    return (
      <Wrap onClick={arrestedToggle}>
        <NickName>{person}</NickName>
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
  background-color: #e8e8e8;
  border-radius: 5px;
  display: flex;
  flex-direction: row-reverse;
  cursor: pointer;
  position: relative;
`;

const NickName = styled.div`
  /* width: 204px; */
  width: 100%;
  height: 28px;
  background-color: #dfdfdf;
  color: #2b2b2b;
  font-weight: 600;
  align-self: flex-end;
  text-align: center;
  border-radius: 0px 0px 5px 5px;
`;

const Arrested = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-25%);
  margin-left: -80px;
  z-index: 999;
`;
