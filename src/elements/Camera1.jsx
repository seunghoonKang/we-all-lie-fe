import { useState } from 'react';
import styled from 'styled-components';
import arrestedstamp from '../img/arrested.png';

const Camera = ({ person, addperson }) => {
  return (
    <div>
      <Wrap>
        <NickName>
          {person}, {addperson}
        </NickName>
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
  cursor: pointer;
  position: relative;
`;

const NickName = styled.div`
  width: 204px;
  height: 28px;
  background-color: #dfdfdf;
  color: #2b2b2b;
  font-weight: 600;
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
