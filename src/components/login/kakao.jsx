// 리다이렉트될 화면
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Spinner from "./Spinner";
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

//리다이렉트 화면
const Kakao = () => {
  const navigator = useNavigate();
  const [cookies, setCookie] = useCookies(['nickname']);

  // 인가코드
  let code = new URL(window.location.href).searchParams.get('code');

  const Token = async () => {
    try {
      const res = await axios.get(
        `http://3.36.1.72/api/auth/kakao/callback?code=${code}`
      );
      const kakaoToken = res.data.accessToken;
      localStorage.setItem('kakaotoken', kakaoToken);
      console.log('res값', res);
      const res2 = await axios.post(
        `http://3.36.1.72/api/auth/kakao/callback`,
        { kakaoToken },
        { headers: { Authorization: `Bearer ${kakaoToken}` } }
      );
      console.log('res2값', res2);
      const nickname = res2.data.nickname;
      setCookie('nickname', nickname);
      console.log(cookies);
      navigator('/home');
    } catch (error) {
      console.log('로그인에러', error);
    }
  };
  Token();

  return (
    <div>
      스피너 나중생각
      {/* <Spinner/> */}
    </div>
  );
};

export default Kakao;
