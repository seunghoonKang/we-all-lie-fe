import React from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getUser, __putUser } from '../redux/modules/userSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
  const [Correction, setCorrection] = useState(false);
  const nickRef = useRef('');
  const token = localStorage.getItem('token');
  const [loginState, setLoginState] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['nickname']);
  const getUserInfo = useSelector((state) => state.user.data);
  const { error } = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const navigatino = useNavigate();

  console.log('에러 메세지 받아볼려구', error);

  useEffect(() => {
    if (token) {
      setLoginState(true);
      dispatch(__getUser(token));
    }
  }, []);

  //로그아웃 기능 (추후 더 보수)
  const logoutHandler = () => {
    if (token) {
      setLoginState(true);
      window.localStorage.removeItem('token');
      navigatino('/');
    }
  };

  return (
    <>
      <UserWrap>
        <ProfilWrap>
          {/* 프로필 이미지 */}
          <Profil>
            <img
              // style={{ transform: 'scale(0.8)' }}
              src={getUserInfo.profileImg}
            />
          </Profil>

          {/* 유저이름 + 수정 */}
          <UserNick>
            {!Correction ? (
              getUserInfo.nickname
            ) : (
              <input
                ref={nickRef}
                defaultValue={getUserInfo.nickname}
                type="text"
                placeholder="입력해주세요"
              ></input>
            )}
            <button
              onClick={(e) => {
                const userNickname = { nickname: nickRef.current.value };
                //백에 닉네임 수정 요청
                Correction === true && dispatch(__putUser(userNickname));

                //쿠키도 바꾼다.
                removeCookie('nickname');
                setCookie('nickname', userNickname.nickname, {
                  path: '/',
                  secure: true,
                  sameSite: 'none',
                });
                setCorrection(!Correction);
              }}
            >
              {!Correction ? '수정하기' : '저장하기'}
            </button>
          </UserNick>
        </ProfilWrap>

        {/* 승률 */}
        <MemberInfo>
          스파이 승률
          {getUserInfo.spyWinRating}%
        </MemberInfo>
        <MemberInfo>
          스파이 정답률
          {getUserInfo.voteSpyRating}%
        </MemberInfo>
        <button onClick={logoutHandler}>로그아웃</button>
      </UserWrap>
    </>
  );
};
export default UserInfo;

const UserWrap = styled.div`
  margin-top: 105px;
  margin-right: 20px;
  height: calc(30vh - 50px);
  min-height: 150px;
  min-width: 192px;
  background-color: #8fb7b7;
  flex-direction: column;
  border-radius: 5px;
  display: flex;
  position: fixed;
  left: 84%;
  top: 0;
`;

const ProfilWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const Profil = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.5);
  justify-content: center;
  border-radius: 50%;
  min-width: 30px;
  min-height: 30px;
  height: 40%;
  width: 20%;
  padding: 0;
`;

const UserNick = styled.div`
  /* display: flex; */
  color: black;
  background-color: #b5a689;
  padding: 0;
  font-weight: 700;
  font-size: 14px;
`;

const MemberInfo = styled.div`
  background-color: #dbd3c4;
  color: black;
  border-radius: 10px;
`;
