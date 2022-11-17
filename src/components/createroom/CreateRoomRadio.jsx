import React from 'react';
import { useField } from 'formik';

const CreateRoomRadio = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'radio' });
  return (
    <div>
      <label>{label}</label>
      <div {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CreateRoomRadio;
