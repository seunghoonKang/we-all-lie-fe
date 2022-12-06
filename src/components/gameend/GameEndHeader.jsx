import React from 'react';
import { ReactComponent as Megaphone } from '../../assets/megaphone.svg';
import Button from '../../elements/Button';
import styled from 'styled-components';
import ModalTimer from '../../elements/ModalTimer';

const GameEndHeader = () => {
  const restartBtnHandler = () => {
    console.log('다시시작');
  };

  return (
    <HeaderSection>
      <HeaderTitle>
        <div className="flex">
          <MegaphoneDiv>
            <Megaphone width="15" height="13" fill="none" />
          </MegaphoneDiv>
          <div>스파이를 맞추지 못해 스파이가 승리했습니다.</div>
        </div>
      </HeaderTitle>
      <ButtonContainer>
        <Button
          type={'button'}
          addStyle={{
            backgroundColor: '#FF7300',
            borderRadius: '10px 10px 0 0',
            width: '113px',
            height: '40px',
            color: '#fff',
            fontSize: '14px',
            paddingRight: '11px',
          }}
          onClick={restartBtnHandler}
        >
          재시작
        </Button>
        <TimerOnButton>
          <ModalTimer
            modalSec="20"
            width="16px"
            height="16px"
            fontSize="12px"
            color="#FF7300"
            backgroundColor="#fff"
            borderColor="#fff"
          />
        </TimerOnButton>
      </ButtonContainer>
    </HeaderSection>
  );
};

const HeaderSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px 10px 0 0;
  background-color: ${(props) => props.theme.color.white};
  height: 40px;
  width: 97%;
`;

const MegaphoneDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
  margin-right: 8px;
`;

const ButtonContainer = styled.div`
  position: relative;
`;

const TimerOnButton = styled.div`
  position: absolute;
  top: 13px;
  left: 77px;
`;

export default GameEndHeader;
