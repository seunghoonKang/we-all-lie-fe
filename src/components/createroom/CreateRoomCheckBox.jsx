import React from 'react';
import { useField } from 'formik';

const CreateRoomCheckBox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div>
      {/* <label>{children}</label> */}
      <input type="checkbox" {...field} {...props} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
};

export default CreateRoomCheckBox;
