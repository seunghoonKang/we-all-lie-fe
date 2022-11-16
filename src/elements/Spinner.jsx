import React from 'react';

const Spinner = () => {
  return (
    <div className=" w-screen h-screen top-0 left-0 bg-[rgba(255,255,255,0.72)] z-40 flex flex-col items-center justify-center">
      <img src="/img/spinner.gif"></img>
    </div>
  );
};

export default Spinner;
