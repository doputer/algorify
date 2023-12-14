import { useRef, useState } from 'react';

import bubble from './algorithm/bubbleSort';
import insertion from './algorithm/insertionSort';
import selection from './algorithm/selectionSort';
import Controller from './controller';
import Viewer from './viewer';

const algorithm = {
  BUBBLE: 'bubble',
  SELECTION: 'selection',
  INSERTION: 'insertion',
};

const generator: {
  [key: string]: (array: number[]) => Generator<{ type: string; payload: number[] }>;
} = {
  [algorithm.BUBBLE]: bubble,
  [algorithm.SELECTION]: selection,
  [algorithm.INSERTION]: insertion,
};

const useView = (algorithm: string) => {
  const [values, setValues] = useState([3, 1, 7, 2, 6, 4, 5]);

  const _pause = useRef(false);
  const _delay = useRef(250);

  const viewer = () => {
    return (
      <Viewer
        values={values}
        _pause={_pause}
        _delay={_delay}
        generator={() => generator[algorithm]([...values])}
        cb={() => {
          setValues([...values]);
        }}
      />
    );
  };

  const controller = () => {
    return <Controller _pause={_pause} _delay={_delay} />;
  };

  return [viewer, controller];
};

export default useView;
