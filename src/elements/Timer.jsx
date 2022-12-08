import React, { useEffect, useRef, useState } from 'react';

const padStartTime = (num) => {
  return String(num).padStart(2, '0');
};

const Timer = ({ min, sec, timeout, setTimeout }) => {
  const Min = min ? parseInt(min) : 0;
  const Sec = sec ? parseInt(sec) : 0;
  const count = useRef(Min * 60 + Sec);
  const interval = useRef(null);

  const [minute, setMinute] = useState(padStartTime(Min));
  const [second, setSecond] = useState(padStartTime(Sec));

  useEffect(() => {
    interval.current = setInterval(() => {
      count.current -= 1;

      setMinute(padStartTime(parseInt((count.current % 3600) / 60)));
      setSecond(padStartTime(count.current % 60));
    }, 1000);
  }, []);

  useEffect(() => {
    if (count.current <= 0) {
      setTimeout(true);
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
