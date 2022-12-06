import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SelectCategoryImg from '../gamestart/SelectCategoryImg';

const GameEndContents = () => {
  const category = useSelector((state) => state.game.category);
  const answerWord = useSelector((state) => state.game.answerWord);
  const spy = useSelector((state) => state.game.spy);

  return (
    <GameEndEntireContainer>
      <GameCardSection>
        <CategoryImg>
          <div>
            <AnswerCategoryDiv>
              {category} / {answerWord}
            </AnswerCategoryDiv>
          </div>
          <SelectCategoryImg category={category} width="513" height="238" />
        </CategoryImg>
        <CorrectCard>
          <div></div>
          <SpyName>{spy}</SpyName>
        </CorrectCard>
      </GameCardSection>
    </GameEndEntireContainer>
  );
};

const GameEndEntireContainer = styled.div`
  width: 100%;
  min-height: 550px;
  height: calc(90vh - 100px);
  border: 3px red solid;
`;

const GameCardSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  width: 100%;
  gap: 16px;
`;

const AnswerCategoryDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 158px;
  height: 40px;
  background-color: ${(props) => props.theme.color.lionBlack};
  color: ${(props) => props.theme.color.white};
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSize.sm};
  border-radius: 6px;
  margin-top: 9px;
  margin-right: 10px;
  margin-bottom: 33px;
`;

const CategoryImg = styled.div`
  width: 26.5rem;
  height: 23.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin-left: 16px;
  background-color: ${(props) => props.theme.color.gray1};
  border-radius: 6px;
`;

const CorrectCard = styled.div`
  position: relative;
  width: 26.5rem;
  height: 23.5rem;
  background-color: ${(props) => props.theme.color.gray1};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-right: 18px;
`;

const SpyName = styled.div`
  position: absolute;
  top: 325px;
  left: 16px;
  width: 10rem;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.lionOrange};
  border-radius: 6px;
`;

export default GameEndContents;
