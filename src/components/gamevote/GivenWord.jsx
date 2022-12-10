import React, { useState } from 'react';

const GivenWord = ({ word }) => {
  const [checked, setChecked] = useState(false);
  const checkWord = () => {
    setChecked(!checked);
  };

  return (
    <>
      {checked ? (
        <div
          className="min-w-[130px] min-h-[43px] text-center flex justify-center items-center bg-[#dfdfdf] rounded-md break-words cursor-pointer ease-in-out duration-300"
          onClick={checkWord}
        >
          {word}
        </div>
      ) : (
        <div
          className="min-w-[130px] min-h-[43px] text-center flex justify-center items-center bg-[#fff] rounded-md break-words cursor-pointer ease-in-out duration-300"
          onClick={checkWord}
        >
          {word}
        </div>
      )}
    </>
  );
};

export default GivenWord;
