import styled from 'styled-components';
import React, { useEffect, useRef } from 'react';
import { ReactComponent as Preparing } from '../assets/preparing_cat.svg';
import { useSelector } from 'react-redux';
import arrestedstamp from '../img/arrested.png';

const Camera = ({ streamManager }) => {
  const videoRef = useRef();

  function getNicknameTag() {
    // Gets the nickName of the user
    if (streamManager) {
      return JSON.parse(streamManager.stream.connection.data).clientData;
    } else {
      return '';
    }
  }

  useEffect(() => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, []);

  return (
    <Wrap>
      <PreParingIconWrap>
        {streamManager !== undefined ? (
          <div>
            <video autoPlay={true} ref={videoRef} />
          </div>
        ) : (
          <Preparing />
        )}
      </PreParingIconWrap>
      <NickName>{getNicknameTag()}</NickName>
    </Wrap>
  );
};

export default Camera;

const Wrap = styled.div`
  /* max-width: 204px; */
  /* width: 24%; */
  /* height: 45%; */
  /* min-height: 170px; */
  max-width: 300px;
  max-height: 200px;
  background-color: #e8e8e8;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const PreParingIconWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NickName = styled.div`
  width: 100%;
  height: 28px;
  line-height: 28px;
  background-color: #dfdfdf;
  color: #2b2b2b;
  font-weight: 600;
  font-size: 14px;
  align-self: flex-end;
  text-align: center;
  border-radius: 0px 0px 5px 5px;
`;
