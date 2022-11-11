import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import CreateRoomTextInput from './CreateRoomTextInput';
import CreateRoomSelect from './CreateRoomSelect';
import CreateRoomCheckBox from './CreateRoomCheckBox';

const CreateRoom = () => {
  return (
    <>
      <Formik
        initialValues={{
          roomTitle: '',
          participants: '',
          difficulty: 'Easy',
          privateRoom: false,
        }}
        validationSchema={Yup.object({
          roomTitle: Yup.string()
            .max(15, '15자 이하로 작성해주세요')
            .required('필수 입력'),
          participants: Yup.string()
            .oneOf(['4', '5', '6', '7', '8'], '유효한 인원 수를 선택해주세요')
            .required('필수 입력'),
          //privateRoom: Yup.boolean().oneOf([true]),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            //소켓으로 보내면 되겠지..?
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <CreateRoomTextInput
            label="방 제목"
            name="roomTitle"
            type="text"
            placeholder="방 제목을 입력해주세요"
          ></CreateRoomTextInput>
          <CreateRoomSelect label="인원수" name="participants">
            <option value="">인원 선택</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </CreateRoomSelect>

          <div role="group">
            <label>
              <Field type="radio" name="difficulty" value="Easy" />
              Easy
            </label>
            <label>
              <Field type="radio" name="difficulty" value="Hard" />
              Hard
            </label>
          </div>
          <CreateRoomCheckBox name="privateRoom">비공개</CreateRoomCheckBox>
          <button type="submit">방 만들기</button>
        </Form>
      </Formik>
    </>
  );
};

export default CreateRoom;
