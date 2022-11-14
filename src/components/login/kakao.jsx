// 리다이렉트될 화면
import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
// import Spinner from "./Spinner";

//리이렉트 화면
const Kakao = () => {
  const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  console.log(window.location.href);

  // axios
  // .get(`http://3.36.1.72/api/auth/kakao/callback?code=${code}`)

  const Get = async () => {
    try {
      const { data } = await axios.get(
        `http://3.36.1.72/api/auth/kakao/callback?code=${code}`
      );
      return console.log(data.data);
    } catch (error) {
      return alert(error);
    }
  };
  Get();
  // axios({
  //   // method: "GET",
  //   // url: `http://localhost:3000/api/auth/kakao/callback?code=${code}`,
  // })
  // .then((res) => {
  //   console.log(res);
  // }); // 토큰이 넘어올 것임

  //   const ACCESS_TOKEN = res.data.accessToken;
  //   window.localStorage.setItem("token", ACCESS_TOKEN); //예시로 로컬에 저장함
  //   // window.localStorage.setItem('name', 'anna');
  //   window.location.href("home");
  // })
  // .catch((err) => {
  //   console.log("소셜로그인 에러", err);
  //   window.alert("로그인에 실패하였습니다.");
  //   window.location.href("login");
  // });

  return (
    <div>
      스피너 나중생각
      {/* <Spinner/> */}
    </div>
  );
};

export default Kakao;
