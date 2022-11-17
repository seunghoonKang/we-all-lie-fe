import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { socket } from '../../shared/socket';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import CreateRoomTextInput from './CreateRoomTextInput';
//import CreateRoomRadio from './CreateRoomRadio';
// import CreateRoomSelect from './CreateRoomSelect';
import CreateRoomCheckBox from './CreateRoomCheckBox';

const CreateRoom = ({ closeModal }) => {
  const [cookies, setCookies] = useCookies(['nickname']);
  const nickname = cookies['nickname'];

  //모달창 닫기
  const closeBtnHandler = () => {
    closeModal();
  };

  //클릭 시 모드에 따른 CSS 변경
  const [easyModeColor, setEasyModeColor] = useState('white');
  const [hardModeColor, setHardModeColor] = useState('white');
  const modeClickHandler = (e) => {
    return e.target.id === 'EASY'
      ? (setEasyModeColor('gray'), setHardModeColor('white'))
      : (setEasyModeColor('white'), setHardModeColor('gray'));
  };

  //모달 오픈, 닫기 시 위치 고정
  useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <ModalContainer>
      <ModalBackGround onClick={closeBtnHandler}>
        <CreateRoomDiv onClick={(e) => e.stopPropagation()}>
          <FormHeader>CREATE ROOM</FormHeader>

          <Formik
            className=" bg-slate-200 w-96 h-96"
            initialValues={{
              roomTitle: '',
              participants: '',
              gameMode: false,
              privateRoom: false,
              roomPassword: '',
              currentCount: 1,
            }}
            validationSchema={Yup.object({
              roomTitle: Yup.string()
                .max(15, '15자 이하로 작성해주세요')
                .required('필수 입력'),
              /* participants: Yup.string()
                .oneOf(
                  ['4', '5', '6', '7', '8'],
                  '유효한 인원 수를 선택해주세요'
                )
                .required('필수 입력'),
              gameMode: Yup.string().oneOf(
                ['Easy'],
                '하드 모드는 준비중입니다.'
              ),
              privateRoom: Yup.boolean().oneOf([false], '기능 구현예정입니다'),
              */
              privateRoom: Yup.boolean(),
              roomPassword: Yup.number().when('privateRoom', {
                is: (privateRoom) => privateRoom !== true,
                then: Yup.number()
                  .oneOf([true], '비밀방 설정 체크 필수')
                  .typeError('숫자만 가능'),
              }),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                console.log(values);
                socket.emit(
                  'createRoom',
                  values.gameMode,
                  values.roomTitle,
                  nickname
                );
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form className=" flex flex-col pt-[15px] w-full">
              <div className="pl-[15px] pr-[15px]">
                <CreateRoomTextInput
                  label="TITLE"
                  name="roomTitle"
                  type="text"
                  placeholder="방 제목을 입력해주세요"
                />
              </div>
              {/* 추가구현예정
              <CreateRoomSelect label="인원수" name="participants">
                <option value="">인원 선택</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </CreateRoomSelect>
                */}
              <div className="flex gap-[16px] pl-[15px] pr-[15px]">
                <div role="group" className="flex flex-col">
                  <p className="mt-[10px]">MODE</p>
                  <div className="flex">
                    <ModeBtn
                      color={easyModeColor}
                      onClick={modeClickHandler}
                      id="EASY"
                    >
                      <label>
                        <Field
                          type="radio"
                          name="gameMode"
                          value="false"
                          id="EASY"
                          className="appearance-none"
                        />
                        EASY
                      </label>
                    </ModeBtn>
                    <ModeBtn
                      color={hardModeColor}
                      onClick={modeClickHandler}
                      id="HARD"
                    >
                      <label>
                        <Field
                          type="radio"
                          name="gameMode"
                          value="true"
                          id="HARD"
                          className="appearance-none"
                        />
                        HARD
                      </label>
                    </ModeBtn>
                  </div>
                </div>
                {/* 추가구현예정 */}
                <div className="w-full ">
                  <p className="mt-[10px]">비밀방 설정</p>
                  <div className=" flex">
                    <CreateRoomCheckBox
                      name="privateRoom"
                      className="appearance-none w-[26px] h-[26px] border-solid border-black border-[0.5px] flex checked:bg-blue-200"
                    />
                    <CreateRoomTextInput
                      name="roomPassword"
                      type="password"
                      placeholder=""
                      className="bg-gray-300 w-full"
                      disabled
                    ></CreateRoomTextInput>
                  </div>
                </div>
              </div>
              <div className="flex mt-[20px] justify-around">
                <button
                  type="button"
                  onClick={closeBtnHandler}
                  className=" w-full border-solid border-black border-l-[0.5px] border-t-[0.5px] border-b-[0.5px] min-h-[30px]"
                >
                  취소하기
                </button>
                <button
                  type="submit"
                  className=" w-full border-solid border-black border-[0.5px] min-h-[30px]"
                >
                  개설하기
                </button>
              </div>
            </Form>
          </Formik>
        </CreateRoomDiv>
      </ModalBackGround>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  box-sizing: border-box;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 999;
  opacity: 1;
`;

const ModalBackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CreateRoomDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 530px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 20px 60px -2px rgb(27 33 58 / 40%);
  padding: 0;
`;

const FormHeader = styled.div`
  width: 100%;
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #aaaaaa80;
`;

const ModeBtn = styled.div`
  width: 118px;
  min-height: 26px;
  border: 0.5px solid black;
  text-align: center;
  background-color: ${(props) => props.color};
`;

export default CreateRoom;
