import React, { useState } from 'react';
import { Formik, Form, useFormik } from 'formik';

const CreateRoom = () => {
  const [title, setTitle] = useState('');
  const onChnageHandler = (e) => {
    setTitle(e.target.value);
  };
  const formik = useFormik({
    initialValues: {
      roomTitle: '',
      participants: 0,
      difficulty: '',
      private: '',
    },
  });

  return (
    <Formik
      initialValues={{
        roomTitle: '',
        participants: 0,
        difficulty: '',
        private: '',
      }}
    >
      {(formik) => {
        {
          console.log(formik);
        }
        <Form></Form>;
      }}
      {/* <input
        placeholder="방 제목을 입력하세요"
        onChange={onChnageHandler}
        value={title}
      ></input> */}
    </Formik>
  );
};

export default CreateRoom;
