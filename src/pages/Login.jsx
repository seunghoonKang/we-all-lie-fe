import styled from 'styled-components';
import Notice from '../elements/Notice';
import { ReactComponent as WeAllLie } from '../assets/we_all_lie.svg';
import Description from '../components/login/Description';
import { useState } from 'react';
import { ReactComponent as Modalimg } from '../assets/play_modal.svg';

const Login = () => {
  const [playModal, setPlayModal] = useState(false);

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Wrap>
      <Notice />
      <MiniWrap>
        <MainImg>
          <WeAllLie />
        </MainImg>

        <BtnWrap>
          <Modalimg
            onClick={() => {
              setPlayModal(!playModal);
            }}
          />
          {playModal ? (
            <Description
              closeDescription={() => {
                setPlayModal(!playModal);
              }}
            />
          ) : (
            <></>
          )}

          <KaKaoBtn onClick={handleLogin}>
            <img
              style={{ transform: 'scale(0.3)' }}
              src="/img/kakao1.png"
            ></img>
            <span>카카오 로그인</span>
          </KaKaoBtn>
        </BtnWrap>
      </MiniWrap>
    </Wrap>
  );
};

export default Login;

const Wrap = styled.div`
  background: #222222;
  justify-content: center;
  width: calc(100%);
  height: 92vh;
  min-height: 650px;
  margin-bottom: 100px;
`;

const MiniWrap = styled.div`
  padding: 0px 0px 90px;
`;

// const P = styled.div`
//   color: #000000;
//   font-family: Pretendard, 'Source Sans Pro';
//   font-size: 50px;
//   font-weight: 800;
//   /* white-space: nowrap; */
//   margin: 102px auto 0 auto;
//   text-align: center;
//   /* width: 50%; */
//   flex-wrap: Wrap;
// `;

const MainImg = styled.div`
  /* height: 360px; */
  object-fit: contain;
  vertical-align: top;
  display: inline;
  justify-content: center;
  display: flex;
  align-self: center;
  columns: center;
  margin: 12px auto 0 auto;
  img {
    width: 1080px;
    height: 360px;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const KaKaoBtn = styled.div`
  height: 52px;
  display: inline-block;
  display: flex;
  position: absolute;
  text-align: center;
  padding: 11px 0px 10px;
  justify-content: center;
  background: #ffcd2a;
  align-items: center;
  min-width: 410px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;

  margin: 12px auto 0px 90px;
  &:hover {
    background-color: #f4c31f;
  }
`;
