import React from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import GivenWord from './GivenWord';

const WordExamples = (props) => {
  const words = useSelector((state) => state.game.showWords);
  const answerWord = useSelector((state) => state.game.answerWord);
  const category = useSelector((state) => state.game.category);
  const spy = useSelector((state) => state.game.spy); //스파이 닉네임 들고오기
  const [cookies] = useCookies(['nickname']);
  const nickname = cookies.nickname;

  const spyClickWord = (word) => {
    if (spy === nickname) {
      props.setSpyAnswer(word);
      console.log('word::', word);
      console.log('spyAnswer::', props.spyAnswer);
    }
  };

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
              // return <GivenWord word={word} key={word} />;
              <Word key={word} onClick={() => spyClickWord(word)}>
                {word}
              </Word>;
            })}
          </IllustSection>
        </CorrectCard>
      ) : (
        <CorrectCard>
          <CorrectAnswer>
            <AnswerCategoryDiv>
              {category}/{answerWord}
            </AnswerCategoryDiv>
          </CorrectAnswer>
          <IllustSection>
            {words.map((word) => {
              return <Word key={word}>{word}</Word>;
            })}
          </IllustSection>
        </CorrectCard>
      )}
    </>
  );
};
export default WordExamples;

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

const Word = styled.div``;
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
  ${Word} {
    width: 130px;
    height: 43px;
  }
`;
