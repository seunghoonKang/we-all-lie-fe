import styled from 'styled-components';
import { React } from 'react';
import MainSwiper from './MainSwiper';

const Description = ({ closeDescription }) => {
  //게임 설명 닫기
  const closeBtnHandler = () => {
    closeDescription();
  };

  return (
    <ModalContainer>
      <ModalBackGround>
        <GameDescription>
          {/* <FormHeader>게임 설명 : 게임 하면서 배우세요 ^^</FormHeader> */}
          <MainSwiper />
          <button
            type="button"
            onClick={closeBtnHandler}
            className=" w-full border-solid border-black border-l-[0.5px] border-t-[0.5px] border-b-[0.5px] min-h-[30px]"
          >
            닫기
          </button>
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

const FormHeader = styled.div`
  width: 100%;
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #aaaaaa80;
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
  width: 650px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 20px 60px -2px rgb(27 33 58 / 40%);
  padding: 0;
`;
