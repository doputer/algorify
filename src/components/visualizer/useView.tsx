import { useRef, useState } from 'react';

import bubble from './algorithm/bubble-sort';
import cocktail from './algorithm/cocktail-sort';
import insertion from './algorithm/insertion-sort';
import selection from './algorithm/selectioin-sort';
import Controller from './controller';
import Viewer from './viewer';

const algorithm = {
  BUBBLE: 'bubble',
  SELECTION: 'selection',
  INSERTION: 'insertion',
  COCKTAIL: 'cocktail',
};

const generator: {
  [key: string]: (array: number[]) => Generator<{ type: string; payload: number[] }>;
} = {
  [algorithm.BUBBLE]: bubble,
  [algorithm.SELECTION]: selection,
  [algorithm.INSERTION]: insertion,
  [algorithm.COCKTAIL]: cocktail,
};

const useView = (algorithm: string) => {
  const [values, setValues] = useState([3, 1, 7, 2, 6, 4, 5]);

  const _pause = useRef(false);
  const _delay = useRef(500);

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
