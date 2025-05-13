import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type TimerReturnType = [number, Dispatch<SetStateAction<number>>];

const useTimer = (initialSeconds: number): TimerReturnType => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prevSeconds => prevSeconds - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return [seconds, setSeconds];
};

export default useTimer;
