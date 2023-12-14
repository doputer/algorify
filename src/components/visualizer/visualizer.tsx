import { useEffect, useRef, useState } from 'react';

import { PauseIcon, PlayIcon } from '@radix-ui/react-icons';

import bubbleSort from './algorithm/bubbleSort';
import selectionSort from './algorithm/selectionSort';

interface VisualizerProps {
  algorithm: string;
}

function Visualizer({ algorithm }: VisualizerProps) {
  const initRefs = useRef<HTMLDivElement[]>([]);
  const refs = useRef<HTMLDivElement[]>([]);
  const palette = {
    normal: '#d1d5db',
    pick: '#ffadad',
    hold: '#99d98c',
    done: '#7fc8f8',
  };

  const values = [9, 8, 7, 6, 5, 4, 3, 2, 1];

  const _delay = useRef<number>(500);
  const _pause = useRef<boolean>(false);

  const [delay, setDelay] = useState(_delay.current);
  const [pause, setPause] = useState(_pause.current);

  const wait = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        function __pause() {
          if (_pause.current) setTimeout(__pause, 200);
          else resolve(true);
        }
        __pause();
      }, _delay.current);
    });

  useEffect(() => {
    algorithm === 'bubble' && operate(() => bubbleSort([...values]));
    algorithm === 'selection' && operate(() => selectionSort([...values]));

    initRefs.current = [...refs.current];
  }, []);

  const changeColor = (target: HTMLDivElement, color: string) => {
    target.style.backgroundColor = color;
  };

  const operate = async (generator: () => Generator<{ type: string; payload: number[] }>) => {
    let done: number[] = [];

    for (const operation of generator()) {
      const { type, payload } = operation;

      if (type === 'compare') {
        payload.forEach((val) => changeColor(refs.current[val], palette.pick));
      } else if (type === 'swap') {
        const [p1, p2] = payload;

        payload.forEach((val) => changeColor(refs.current[val], palette.hold));

        const ref1 = refs.current[p1];
        const ref2 = refs.current[p2];

        [ref1.style.left, ref2.style.left] = [ref2.style.left, ref1.style.left];
        [refs.current[p1], refs.current[p2]] = [ref2, ref1];
      } else if (type === 'done') {
        done = done.concat(payload);
        payload.forEach((val) => changeColor(refs.current[val], palette.done));
      }

      await wait();

      payload.forEach(
        (val) => !done.includes(val) && changeColor(refs.current[val], palette.normal)
      );
    }

    await wait();

    values.forEach((value, index) => {
      refs.current[index].style.left = `${(value - 1) * 30}px`;
      changeColor(refs.current[index], palette.normal);
    });

    refs.current = [...initRefs.current];

    await wait();

    operate(generator);
  };

  const controlPause = () => {
    setPause(!pause);
    _pause.current = !_pause.current;
  };

  const controlSpeed = () => {
    if (delay === 15.625) {
      setDelay(500);
      _delay.current = 500;
      return;
    }

    setDelay(delay / 2);
    _delay.current = _delay.current / 2;
  };

  return (
    <>
      <div className="relative h-[200px] w-full">
        {values.map((bar, index) => (
          <div
            key={bar}
            className={`absolute left-0 top-0 flex items-end justify-center rounded-t-md bg-gray-300`}
            style={{
              left: index * 30,
              top: 200 - bar * 20,
              width: 20,
              height: bar * 20,
              transition: `left ${_delay.current / 1000}s`,
            }}
            ref={(e: HTMLDivElement) => refs.current.push(e)}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 stroke-black stroke-2 text-xl font-bold">
        <button onClick={() => controlPause()} className="rounded-full bg-[#d1d5db] p-1">
          {pause ? <PlayIcon /> : <PauseIcon />}
        </button>
        <button onClick={() => controlSpeed()}>{500 / _delay.current}x</button>
      </div>
    </>
  );
}

export default Visualizer;
