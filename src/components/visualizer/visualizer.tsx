import { useEffect, useRef } from 'react';

import wait from '@/utils/wait';

import bubbleSort from './algorithm/bubbleSort';
import selectionSort from './algorithm/selectionSort';

interface VisualizerProps {
  algorithm: string;
}

function Visualizer({ algorithm }: VisualizerProps) {
  const refs = useRef<HTMLDivElement[]>([]);
  const palette = {
    normal: '#d1d5db',
    pick: '#ffadad',
    hold: '#99d98c',
    done: '#7fc8f8',
  };
  const delay = 500;

  const values = [9, 8, 7, 6, 5, 4, 3, 2, 1];

  useEffect(() => {
    algorithm === 'bubble' && operate(bubbleSort([...values]));
    algorithm === 'selection' && operate(selectionSort([...values]));
  }, []);

  const changeColor = (target: HTMLDivElement, color: string) => {
    target.style.backgroundColor = color;
  };

  const operate = async (
    operations: Generator<{
      type: string;
      payload: number[];
    }>
  ) => {
    let done: number[] = [];

    for (const operation of operations) {
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

      await wait(delay);

      payload.forEach(
        (val) => !done.includes(val) && changeColor(refs.current[val], palette.normal)
      );
    }
  };

  return (
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
            transition: `left ${delay / 1000}s`,
          }}
          ref={(e: HTMLDivElement) => refs.current.push(e)}
        />
      ))}
    </div>
  );
}

export default Visualizer;
