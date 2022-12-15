import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import GivenWord from './GivenWord';

const CorrectCardSection = () => {
  // const words = useSelector((state) => state.game.showWords);
  // const answerWord = useSelector((state) => state.game.answerWord);
  // const category = useSelector((state) => state.game.category);
  const words = useSelector((state) => state.game.sendCategory.showWords);
  const answerWord = useSelector((state) => state.game.sendCategory.answerWord);
  const category = useSelector((state) => state.game.sendCategory.category);
  const spy = useSelector((state) => state.game.spy);
  const [cookies] = useCookies(['nickname']);
  return (
    <>
      {spy === cookies.nickname ? (
        <CorrectCard>
          <CorrectAnswer>
            <WhatWords>제시어</WhatWords>
            <AnswerCategoryDiv>{category} / ?</AnswerCategoryDiv>
          </CorrectAnswer>
          <IllustSection>
            {words.map((word) => {
              return <GivenWord word={word} key={word} />;
            })}
          </IllustSection>
        </CorrectCard>
      ) : (
        <CorrectCard>
          <CorrectAnswer>
            <WhatWords>제시어</WhatWords>
            <AnswerCategoryDiv>
              {category}/{answerWord}
            </AnswerCategoryDiv>
          </CorrectAnswer>
          <IllustSection>
            {words.map((word) => {
              return <GivenWord word={word} key={word} />;
            })}
          </IllustSection>
        </CorrectCard>
      )}
    </>
  );
};

const CorrectCard = styled.div`
  width: 100%;
  height: 14.5625rem;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 15px;
  margin-right: 18px;
  padding: 10px;
`;

const CorrectAnswer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  font-size: 16px;
  width: 100%;
  height: 56px;
  border-radius: 6px 6px 0 0;
  background-color: #f5f5f5;
`;

const WhatWords = styled.div`
  width: 42px;
  height: 20px;
  margin: 0 0 0 27px;
`;

const AnswerCategoryDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 158px;
  height: 38px;
  background-color: ${(props) => props.theme.color.lionBlack};
  color: ${(props) => props.theme.color.white};
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSize.sm};
  border-radius: 6px;
  margin-top: 9px;
  margin-right: 10px;
  margin-bottom: 9px;
`;

const IllustSection = styled.div`
  width: 100%;
  height: 12.0625rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  gap: 3px;
  padding-bottom: 10px;
  border-radius: 0 0 6px 6px;
`;

export default CorrectCardSection;
