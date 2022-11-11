import React from 'react';
import { useField } from 'formik';

const CreateRoomSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default CreateRoomSelect;
