import {NormalText} from '@ui';
import {Colors} from '@ui/colors';
import React, {FC, useEffect, useState} from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

interface Props {
  duration: number;
  onFinish?: () => void;
}

export const Timer: FC<Props> = ({duration, onFinish}) => {
  const [time, setTime] = useState(duration);

  // Update timer once a second (every time `time` changes)
  const fill = (time * 100) / duration;
  useEffect(() => {
    if (time <= 0) {
      onFinish && onFinish();
      return;
    }

    const timeout = setTimeout(() => {
      setTime((prevState) => prevState - 1);
    }, 1000);

    return (): void => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line
  }, [time]);

  return (
    <AnimatedCircularProgress
      size={40}
      width={4}
      fill={fill}
      tintColor={Colors.secondary}
      backgroundColor={Colors.gray}
      lineCap={'round'}>
      {(): any => <NormalText>{time}</NormalText>}
    </AnimatedCircularProgress>
  );
};
