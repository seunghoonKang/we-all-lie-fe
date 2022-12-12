import React from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getUser, __putUser } from '../redux/modules/userSlice';
import { useState } from 'react';

const UserInfo = () => {
  const [Correction, setCorrection] = useState(false);
  const nickRef = useRef('');
  const token = localStorage.getItem('token');
  const [loginState, setLoginState] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['nickname']);
  const getUserInfo = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      setLoginState(true);
      dispatch(__getUser(token));
    }
  }, [dispatch]);

  return (
    <>
      <UserWrap>
        <ProfilWrap>
          <Profil>
            <img src={getUserInfo.profileImg} />
          </Profil>
          <UserNick>
            {!Correction ? (
              getUserInfo.nickname
            ) : (
              <input ref={nickRef} placeholder="입력해주세요"></input>
            )}
            <button
              onClick={(e) => {
                const userNickname = { nickname: nickRef.current.value };
                //수정하는 거임
                dispatch(__putUser(userNickname));
                removeCookie('nickname');
                setCookie('nickname', userNickname.nickname, {
                  path: '/',
                  secure: true,
                  sameSite: 'none',
                });
                console.log('나는야 쿠키몬스터', cookies);
                setCorrection(!Correction);
              }}
            >
              {!Correction ? '수정하기' : '저장하기'}
            </button>
          </UserNick>
        </ProfilWrap>
        <MemberInfo>
          스파이 승률
          {getUserInfo.spyWinRating}%
        </MemberInfo>
        <MemberInfo>
          스파이 정답률
          {getUserInfo.voteSpyRating}%
        </MemberInfo>
        <button>로그아웃</button>
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
  background-color: #b78f8f;
  flex-direction: column;
  border: black;
  border-radius: 5px;
  display: flex;
  position: fixed;
  left: 80%;
  top: 0;
`;

const ProfilWrap = styled.div`
  display: flex;
  background-color: #a5d397;
  padding: 0;
`;
const Profil = styled.div`
  display: flex;
  background-color: #9d8b68;
  padding: 0;
`;

const UserNick = styled.div`
  display: flex;
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
