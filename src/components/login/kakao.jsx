// 리다이렉트될 화면
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import Spinner from '../../elements/Spinner';

//리다이렉트 화면
const Kakao = () => {
  const navigator = useNavigate();
  const [cookies, setCookie] = useCookies(['nickname']);

  // 인가코드
  let code = new URL(window.location.href).searchParams.get('code');

  const Token = async () => {
    try {
      const res = await axios.get(
        `https://tastekim.shop/api/auth/kakao/callback?code=${code}`
      );
      const kakaoToken = res.data.accessToken;
      console.log(kakaoToken);
      localStorage.setItem('kakaotoken', kakaoToken);
      if (res.status === 200) {
        const res2 = await axios.post(
          `https://tastekim.shop/api/auth/kakao/callback?code=${code}`,
          {
            kakaoToken, //카카오 토큰
          },
          {
            headers: {
              Authorization: `Bearer ${kakaoToken}`,
            },
          }
        );
        console.log(res2);
        const nickname = res2.data.nickname;
        // console.log(nickname);
        setCookie('nickname', nickname, {
          path: '/',
          secure: true,
          sameSite: 'none',
        });
        // console.log(cookies);
        if (res2.status == 200) {
          window.location.replace('/home');
        }
      } else {
        alert('카카오톡 요청 실패');
        navigator('/');
      }
    } catch (error) {
      console.log(error);
      alert('로그인 실패');
      navigator('/');
    }
  };

  useEffect(() => {
    Token();
  }, [Token()]);

  return <Spinner />;
};

export default Kakao;
