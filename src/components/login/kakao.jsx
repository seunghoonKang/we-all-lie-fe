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

  // const Token = async () => {
  //   const data = await axios.get(
  //     `http://3.36.1.72/api/auth/kakao/callback?code=${code}`
  //   );
  //   setKakaoToken(data);
  //   console.log(kakaoToken);
  // };

  axios
    .get(`http://3.36.1.72/api/auth/kakao/callback?code=${code}`)
    .then((res) => {
      const kakaoToken = res.data.accessToken;
      // console.log(kakaoToken);
      localStorage.setItem('kakaotoken', kakaoToken);
    })
    .catch((error) => {
      console.log('로그인에러', error);
    });

  const kakaoToken = localStorage.getItem('kakaotoken');
  console.log(kakaoToken);

  axios
    .post(
      `http://3.36.1.72/api/auth/kakao/callback`,
      {
        kakaoToken, //카카오 토큰
      },
      {
        headers: {
          Authorization: `Bearer ${kakaoToken}`,
        },
      }
    )
    .then((res) => {
      // console.log(res);
      const nickname = res.data.nickname;
      setCookie('nickname', nickname);
      // console.log(cookies);
    })
    .catch((error) => {
      console.log('로그인 에러', error);
    });

  useEffect(() => {
    navigator('/home');
  }, [navigator]);

  return (
    <div>
      스피너 나중생각
      {/* <Spinner/> */}
    </div>
  );
};

export default Kakao;
