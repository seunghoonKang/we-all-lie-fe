import React from 'react';
import { useField } from 'formik';
import { ReactComponent as Locked } from '../../assets/locked.svg';
const CreateRoomCheckBox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div>
      {/* <label>{children}</label> */}
      <div>
        <div className="absolute">
          <input type="checkbox" {...field} {...props} />
        </div>
        <div className="relative top-[11px] left-[12px] right-[13px]">
          <Locked width="14" height="16" fill="none" />
        </div>
      </div>
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
};

export default CreateRoomCheckBox;
