import styled from 'styled-components';
import { React } from 'react';
import MainSwiper from './MainSwiper';

const Description = ({ closeDescription }) => {
  //게임 설명 닫기
  // const closeBtnHandler = () => {
  //   closeDescription();
  // };

  return (
    <ModalContainer>
      <ModalBackGround>
        <GameDescription>
          <MainSwiper closeDescription={closeDescription} />
        </GameDescription>
      </ModalBackGround>
    </ModalContainer>
  );
};

export default Description;

const ModalContainer = styled.div`
  position: fixed;
  box-sizing: border-box;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 999;
  opacity: 1;
`;

const ModalBackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GameDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 20px 60px -2px rgb(27 33 58 / 40%);
  padding: 0;
`;
