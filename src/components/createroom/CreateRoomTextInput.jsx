import React from 'react';
import { useField } from 'formik';

const CreateRoomTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className=" text-[14px] font-bold">{label}</label>
      <div className="flex flex-col w-full">
        <input
          className=" border-none w-full bg-[#f5f5f5] h-[40px] rounded-md p-5"
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className=" text-xs text-red-500">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};

export default CreateRoomTextInput;
