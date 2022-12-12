// 리다이렉트될 화면
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useState } from 'react';
import Spinner from '../../elements/Spinner';
import UserInfo from '../UserInfo';
import { useDispatch } from 'react-redux';
import { getToken } from '../../redux/modules/roomSlice';

//리다이렉트 화면
const Kakao = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['nickname']);
  // const [token, setToken] = useState('');

  // 인가코드
  let code = new URL(window.location.href).searchParams.get('code');

  const Token = async () => {
    window.localStorage.removeItem('token');
    try {
      const res = await axios.get(
        `https://minhyeongi.xyz/api/auth/kakao/callback?code=${code}`
      );
      const kakaoToken = res.data.accessToken;
      if (res.status === 200) {
        const res2 = await axios.post(
          `https://minhyeongi.xyz/api/auth/kakao/callback?code=${code}`,

          {
            kakaoToken, //카카오 토큰
            withCredentials: true,
          },
          {
            headers: {
              Authorization: `Bearer ${kakaoToken}`,
            },
          }
        );
        // console.log(res2);
        const nickname = res2.data.nickname;
        // console.log(nickname);
        // console.log(res2.data);
        setCookie('nickname', nickname, {
          path: '/',
          secure: true,
          sameSite: 'none',
        });
        const accessToken = res2.data.accessToken;
        localStorage.setItem('token', accessToken);

        if (res2.status == 200 || 201) {
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
