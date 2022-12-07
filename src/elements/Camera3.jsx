import React from 'react';
import styled from 'styled-components';

const Camera3 = ({ nickname }) => {
  return (
    <>
      <Wrap>
        <NickName>{nickname}</NickName>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  min-height: 140px;
  width: 13vw;
  background-color: #e8e8e8;
  border-radius: 5px;
  display: flex;
  flex-direction: column-reverse;
  border-color: ${(props) => props.borderColor || '#2b2b2b'};
  pointer-events: ${(props) => (props.asker === true ? 'none' : '')};
  position: relative;
`;

const NickName = styled.div`
  width: 100%;
  height: 28px;
  background-color: #dfdfdf;
  color: #2b2b2b;
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-radius: 0px 0px 5px 5px;
`;

export default Camera3;
