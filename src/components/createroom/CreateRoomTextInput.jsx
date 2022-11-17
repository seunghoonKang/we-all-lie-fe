import React from 'react';
import { useField } from 'formik';

const CreateRoomTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label>{label}</label>
      <input
        className=" border-solid border-[0.5px] border-black w-full"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className=" text-xs text-red-500">{meta.error}</div>
      ) : null}
    </>
  );
};

export default CreateRoomTextInput;
