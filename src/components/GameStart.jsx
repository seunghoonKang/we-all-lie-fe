import React from 'react';
import styled from 'styled-components';
import Camera from '../elements/Camera';

const GameStart = () => {
  return (
    <GameEntireContainer>
      <VideoContainer>
        <Camera />
        <Camera />
        <Camera />
        <Camera />
        <Camera />
        <Camera />
        <Camera />
        <Camera />
      </VideoContainer>
      <GameCardSection>
        <div>1</div>
        <div>2</div>
      </GameCardSection>
    </GameEntireContainer>
  );
};

const GameEntireContainer = styled.div`
  display: flex;
  align-content: space-between;
  flex-wrap: wrap;
  height: calc(90vh - 60px);
`;

const VideoContainer = styled.div`
  min-width: 896px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const GameCardSection = styled.section`
  position: absolute;
  top: 50vh;
  //bottom: 0;
  //left: 0;
  //right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
`;

export default GameStart;
