import React from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getUser, __putUser } from '../redux/modules/userSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as NicknameMakeButton } from '../assets/user_make_button.svg';

const UserInfo = ({ roomUserOpenModal, setRoomUserOpenModal }) => {
  const [Correction, setCorrection] = useState(false);
  const nickRef = useRef({});
  const dispatch = useDispatch();
  const navigatino = useNavigate();
  const token = localStorage.getItem('token');
  const [loginState, setLoginState] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['nickname']);
  const getUserInfo = useSelector((state) => state.user.data);
  const putUserInfo = useSelector((state) => state.user.data.nickname);

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
        {roomUserOpenModal === true ? (
          <ProfilWrap>
            {/* 프로필 이미지 */}
            <Profil>
              <img src={getUserInfo.profileImg} />
            </Profil>
            <UserNick> {getUserInfo.nickname}</UserNick>
            <MemberInfo>
              <div>스파이 승률</div>
              {getUserInfo.spyWinRating}%
            </MemberInfo>
            <MemberInfo>
              <div>스파이 정답률</div>
              {getUserInfo.voteSpyRating}%
            </MemberInfo>
          </ProfilWrap>
        ) : (
          <>
            {' '}
            <ProfilWrap>
              {/* 프로필 이미지 */}
              <Profil>
                <img src={getUserInfo.profileImg} />
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
                    e.preventDefault();
                    const userNickname = { nickname: nickRef.current.value };
                    Correction === true && dispatch(__putUser(userNickname));
                    if (nickRef.current.value === '') {
                      alert('내용을 입력해 주세요');
                      return;
                    } else if (putUserInfo) {
                      removeCookie('nickname');
                      setCookie('nickname', putUserInfo, {
                        path: '/',
                        secure: true,
                        sameSite: 'none',
                      });
                    }
                    setCorrection(!Correction);
                  }}
                >
                  <NicknameMakeButton className="rounded-md hover:bg-orange-400" />
                </button>
              </UserNick>
            </ProfilWrap>
            {/* 승률 */}
            <MemberInfo>
              <div>스파이 승률</div>
              {getUserInfo.spyWinRating}%
            </MemberInfo>
            <MemberInfo>
              <div>스파이 정답률</div>
              {getUserInfo.voteSpyRating}%
            </MemberInfo>
            <button onClick={logoutHandler}>로그아웃</button>
          </>
        )}
      </UserWrap>
    </>
  );
};
export default UserInfo;

const UserWrap = styled.div`
  margin-right: 40px;
  min-height: 150px;
  min-width: 192px;
  background-color: ${(props) => props.theme.color.white};
  flex-direction: column;
  border-radius: 5px;
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  font-size: ${(props) => props.theme.fontSize.xs};
  box-shadow: -4px 4px 10px 4px rgba(34, 34, 34, 0.05);
  justify-content: space-around;
`;

const ProfilWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 5px;
  flex-direction: column;
`;

const Profil = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 50%;
  min-width: 30px;
  min-height: 30px;
  height: 40%;
  width: 20%;
  padding: 0;
`;

const UserNick = styled.div`
  color: black;
  padding: 0;
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSize.sm};
`;

const MemberInfo = styled.div`
  background-color: ${(props) => props.theme.color.gray2};
  color: black;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  margin: 5px;
`;
