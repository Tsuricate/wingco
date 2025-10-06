import { Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

interface CountdownProps {
  duration: number;
  onFinish: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ duration = 30, onFinish }) => {
  const [seconds, setSeconds] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          onFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onFinish]);

  return <Text>{seconds}s</Text>;
};

export default Countdown;
