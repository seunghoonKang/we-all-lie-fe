import React from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

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
      console.log('선택한 word', word);
      console.log('spyAnswer에 적용 잘 됐나?', props.spyAnswer);
    }
  };

  return (
    <>
      {/* 내가 스파이라면 onClick 적용 */}
      {spy === cookies.nickname ? (
        <>
          {words.map((word) => {
            <Word key={word} onClick={() => spyClickWord(word)}>
              {word}
            </Word>;
          })}
        </>
      ) : (
        // 내가 스파이가 아니라면 보기만 할 수 있음
        <>
          {words.map((word) => {
            <Word key={word}>{word}</Word>;
          })}
        </>
      )}
    </>
  );
};
export default WordExamples;

const Word = styled.div`
  width: 130px;
  height: 43px;
`;
