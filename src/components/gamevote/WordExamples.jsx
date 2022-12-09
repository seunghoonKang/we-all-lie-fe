import React from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';

const WordExamples = () => {
  const [cookies, setCookies] = useCookies(['nickname']);
  const isSpay = useSelector((state) => state.game.spy); //스파이 닉네임 들고오기
  return <div>GameVote</div>;
};

export default WordExamples;
