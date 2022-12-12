import React from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const WordExamples = (props) => {
  const words = useSelector((state) => state.game.sendCategory.showWords);
  const spy = useSelector((state) => state.game.spy); //스파이 닉네임 들고오기
  const [cookies] = useCookies(['nickname']);
  const nickname = cookies.nickname;

  const spyClickWord = (a) => {
    if (spy === nickname) {
      props.setSpyAnswer(a);
      // console.log('선택한 word', a);
    }
  };

  console.log('spyAnswer에 적용 잘 됐나?', props.spyAnswer);

  return (
    <>
      {/* 내가 스파이라면 onClick 적용 */}
      {spy === cookies.nickname ? (
        <>
          {words.map((word) => {
            return word === props.spyAnswer ? (
              <Word
                key={word}
                onClick={() => spyClickWord(word)}
                style={{
                  // backgroundColor: '${(props) => props.theme.color.lionOrange}',
                  backgroundColor: 'Orange',
                }}
                className="click"
              >
                {word}
              </Word>
            ) : (
              <Word key={word} onClick={() => spyClickWord(word)}>
                {word}
              </Word>
            );
          })}
        </>
      ) : (
        // 내가 스파이가 아니라면 보기만 할 수 있음
        <>
          {words.map((word) => {
            return <Word key={word}>{word}</Word>;
          })}
        </>
      )}
    </>
  );
};
export default WordExamples;

const Word = styled.div`
  /* width: 130px; */
  width: 17%;
  height: 43px;
  cursor: pointer;
  text-align: center;
  line-height: 43px;
  border: 1px solid gray;
  /* background-color: pink; */

  /* .click {
    background-color: ${(props) => props.theme.color.lionOrange};
  }

  & .click {
    background-color: ${(props) => props.theme.color.lionOrange};
  } */
`;
