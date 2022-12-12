import React, { useEffect, useRef, useState } from 'react';

const padStartTime = (num) => {
  return String(num).padStart(2, '0');
};

const Timer = ({ min, sec, timerZero, setTimerZero }) => {
  const Min = min ? parseInt(min) : 0;
  const Sec = sec ? parseInt(sec) : 0;
  const count = useRef(Min * 60 + Sec);
  const interval = useRef(null);

  const [minute, setMinute] = useState(padStartTime(Min));
  const [second, setSecond] = useState(padStartTime(Sec));

  //기본로직
  useEffect(() => {
    interval.current = setInterval(() => {
      count.current -= 1;

      setMinute(padStartTime(parseInt((count.current % 3600) / 60)));
      setSecond(padStartTime(count.current % 60));
    }, 1000);
  }, []);

  //기본로직
  useEffect(() => {
    if (count.current <= 0) {
      //00:00됐을때 timerZero State 값 바꿔주기 (미투표자 자동투표하기 위해)
      timerZero == false && setTimerZero(true);
      console.log('timerZero', timerZero);
      //기본로직
      clearInterval(interval.current);
    }
  }, [second]);

  return (
    <div>
      {minute} : {second}
    </div>
  );
};

export default Timer;
