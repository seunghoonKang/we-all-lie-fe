import React, { useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Button from '../elements/Button';
import ModalTimer from './ModalTimer';

const CommonModal = ({ ...props }) => {
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  //First Btn : 투표취소 핸들러
  const closeModal = () => {
    // props.setVoteStatus(!props.voteStatus);
    props.setVoteModal(!props.voteModal);
    console.log('voteStatus 상태', props.voteStatus);
  };

  //Sec Btn : 투표완료 핸들러 & 스파이 키워드 선택완료 핸들러
  const completeVote = () => {
    //내가 스파이 유저 선택.
    console.log('spyAlive 들어와있니?', props.spyAlive);
    if (props.spyAlive === 'a') {
      console.log('spyAlive === a 실행됨');
      props.socket.emit('voteSpy', props.param.id, props.stamp);
      props.setVoteModal(!props.voteModal);
      console.log(`${props.stamp}투표완료!`);
      console.log('voteStatus 상태', props.voteStatus);
      props.setVoteStatus(true);
    }

    //스파이가 키워드 선택하는 로직
    if (props.spyAlive === false && props.spyAnswerStatus === false) {
      console.log('스파이가 선택한 키워드 emit 실행됨');
      props.socket.emit('spyGuess', props.param.id, props.spyAnswer);
      console.log('스파이 선택키워드', props.spyAnswer);
      props.setSpyAnswerStatus(!props.spyAnswerStatus);
      console.log('*spyAnswerStatus', props.spyAnswerStatus);
    }
    // props.spyAnswer &&
    //   props.socket.emit('spyGuess', props.param.id, props.spyAnswer);

    //선택완료 후 모달 닫기
    props.setVoteModal(!props.voteModal);
  };

  return (
    <>
      <ModalContainer theme={themeContext}>
        <ModalBackGround>
          <ModalNotice>알림</ModalNotice>
          <ModalContents>
            <MainExplain>{props.main}</MainExplain>
            <SubExplain>{props.sub}</SubExplain>
            {props.time ? <ModalTimer modalSec="5" /> : <></>}
            {props.firstBtn ? (
              <ButtonsDiv>
                <Button
                  type={'button'}
                  onClick={closeModal} //투표취소 핸들러
                  addStyle={{
                    width: '110px',
                    height: '40px',
                    color: '#A5A5A5',
                    borderColor: '#A5A5A5',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    hoverBgColor: '#A5A5A5',
                  }}
                >
                  {props.firstBtn}
                </Button>
                <Button
                  type={'button'}
                  onClick={completeVote} //투표완료 핸들러
                  addStyle={{
                    width: '110px',
                    height: '40px',
                    color: '#FF7300',
                    borderColor: '#FF7300',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                  }}
                >
                  {props.secBtn}
                </Button>
              </ButtonsDiv>
            ) : (
              <></>
            )}
          </ModalContents>
        </ModalBackGround>
      </ModalContainer>
    </>
  );
};

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalNotice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 380px;
  height: 40px;
  font-size: 18px;
  font-weight: 700;
  line-height: 26.4;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.lionOrange};
  border-radius: 10px 10px 0 0;
`;
const ModalContents = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 380px;
  height: 184px;
  border-radius: 0 0 10px 10px;
  background-color: ${(props) => props.theme.color.white};
`;
const MainExplain = styled.div`
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: 700;
`;
const SubExplain = styled.div`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 12px;
`;
const ButtonsDiv = styled.div`
  display: flex;
  gap: 9px;
`;

export default CommonModal;
