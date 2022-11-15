import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import CreateRoomTextInput from './CreateRoomTextInput';
import CreateRoomSelect from './CreateRoomSelect';
import CreateRoomCheckBox from './CreateRoomCheckBox';
import CreateRoomRadio from './CreateRoomRadio';
import styled from 'styled-components';

const CreateRoom = ({ closeModal }) => {
  const closeBtnHandler = () => {
    closeModal();
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
          <Formik
            className=" bg-slate-200 w-96 h-96"
            initialValues={{
              roomTitle: '',
              participants: '',
              gameMode: 'Easy',
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
              privateRoom: Yup.boolean().oneOf([false], '기능 구현예정입니다'), */
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                //소켓으로 보내면 되겠지..?
                console.log(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form className=" flex flex-col gap-4">
              <CreateRoomTextInput
                label="방 제목"
                name="roomTitle"
                type="text"
                placeholder="방 제목을 입력해주세요"
              ></CreateRoomTextInput>
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
              <CreateRoomRadio role="group" name="gameMode" label="난이도">
                <label>
                  <Field type="radio" name="gameMode" value="Easy" />
                  Easy
                </label>
                {/*  추가구현예정
                <label>
                  <Field type="radio" name="gameMode" value="Hard" />
                  Hard
                </label>
                 */}
              </CreateRoomRadio>
              {/* 추가구현예정
                <CreateRoomCheckBox name="privateRoom">비공개</CreateRoomCheckBox>
              */}
              <button type="submit">방 만들기</button>
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
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 390px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 20px 60px -2px rgb(27 33 58 / 40%);
  padding: 0;
`;

export default CreateRoom;
