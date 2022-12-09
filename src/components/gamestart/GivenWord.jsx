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
          className="lg:w-[4.9vw] xl:w-[5vw] xl:h-[3.7vh] 2xl:w-[8.5vw] 2xl:h-[3.7vh] min-w-[76px] min-h-[38px] text-[14px] text-center bg-[#dfdfdf] flex justify-center items-center line-through rounded-md break-words cursor-pointer ease-in-out duration-300"
          onClick={checkWord}
        >
          {word}
        </div>
      ) : (
        <div
          className="lg:w-[4.9vw] xl:w-[5vw] xl:h-[3.7vh] 2xl:w-[8.5vw] 2xl:h-[3.7vh] min-w-[76px] min-h-[38px] text-[14px] text-center flex justify-center items-center bg-[#fff] rounded-md break-words cursor-pointer ease-in-out duration-300"
          onClick={checkWord}
        >
          {word}
        </div>
      )}
    </>
  );
};

export default GivenWord;
