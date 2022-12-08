import styled from 'styled-components';
import Notice from '../elements/Notice';
import { ReactComponent as WeAllLie } from '../assets/we_all_lie.svg';
import Description from '../components/login/Description';
import { useState } from 'react';
import { ReactComponent as Modalimg } from '../assets/play_modal.svg';
import { ReactComponent as KakaoIcon } from '../assets/kakao.svg';

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
          <DescriptionModal>
            <Modalimg
              onClick={() => {
                setPlayModal(!playModal);
              }}
            />
          </DescriptionModal>
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
            <KakaoIcon />
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

const MainImg = styled.div`
  object-fit: contain;
  vertical-align: top;
  display: inline;
  justify-content: center;
  display: flex;
  align-self: center;
  columns: center;
  margin: 12px auto 0 auto;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 15px;
`;

const DescriptionModal = styled.div`
  display: flex;
`;

const KaKaoBtn = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  background: #ffcd2a;
  align-items: center;
  min-width: 250px;
  border-radius: 8px;
  line-height: 24px;

  &:hover {
    background-color: #f4c31f;
  }
`;
