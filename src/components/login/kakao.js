// 리다이렉트될 화면
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";

const Kakao = (props) => {
  // const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  // React.useEffect(async () => {
  //   await dispatch(axios.kakaoLogin(code));
  // }, []);

  return <div>스피너 나중생각</div>;
};

export default Kakao;
