import { MutableRefObject, useEffect, useRef } from 'react';

interface ViewerProps {
  values: number[];
  _pause: MutableRefObject<boolean>;
  _delay: MutableRefObject<number>;
  generator: () => Generator<{ type: string; payload: number[] }>;
  cb: () => void;
}

const Palette = {
  normal: '#d1d5db',
  pick: '#ffadad',
  hold: '#99d98c',
  done: '#7fc8f8',
};

function Viewer({ values, _pause, _delay, generator, cb }: ViewerProps) {
  const refs = useRef<HTMLDivElement[]>([]);
  const pointer = Array.from({ length: values.length }, (_, i) => i);

  useEffect(() => {
    operate();
  }, []);

  /* Utils */
  const wait = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        function pause() {
          if (_pause.current) setTimeout(pause, 200);
          else resolve(true);
        }
        pause();
      }, _delay.current);
    });

  const changeColor = (indexes: number[], color: string) => {
    indexes.forEach((index) => (refs.current[pointer[index]].style.background = color));
  };

  /* Operators */
  let temp = -1;
  let doneBlocks: number[] = [];

  const access = (payload: number[]) => {
    changeColor(payload, Palette.pick);
  };

  const swap = (payload: number[]) => {
    const [i, j] = payload;
    const ref1 = refs.current[pointer[i]];
    const ref2 = refs.current[pointer[j]];

    changeColor(payload, Palette.hold);

    [pointer[i], pointer[j]] = [pointer[j], pointer[i]];
    [ref1.style.left, ref2.style.left] = [ref2.style.left, ref1.style.left];
  };

  const store = (payload: number[]) => {
    const [i] = payload;
    const ref = refs.current[pointer[i]];

    changeColor(payload, Palette.pick);

    temp = pointer[i];
    ref.style.top = 0 + 'px';
  };

  const restore = async (payload: number[]) => {
    const [i] = payload;
    const ref = refs.current[temp];

    ref.style.left = i * 30 + 'px';
    await wait();
    ref.style.top = 200 - values[temp] * 20 + 'px';

    pointer[i] = temp;
    temp = -1;
  };

  const right = (payload: number[]) => {
    const [i, j] = payload;
    const ref = refs.current[pointer[i]];

    changeColor([i], Palette.hold);
    ref.style.left = j * 30 + 'px';

    pointer[j] = pointer[i];
  };

  const done = (payload: number[]) => {
    doneBlocks = doneBlocks.concat(payload.map((i) => pointer[i]));
    doneBlocks.forEach((i) => (refs.current[i].style.background = Palette.done));
  };

  const type = {
    ACCESS: 'access',
    SWAP: 'swap',
    STORE: 'store',
    RESTORE: 'restore',
    RIGHT: 'right',
    DONE: 'done',
  };

  const operator = {
    [type.ACCESS]: access,
    [type.SWAP]: swap,
    [type.STORE]: store,
    [type.RESTORE]: restore,
    [type.RIGHT]: right,
    [type.DONE]: done,
  };

  const operate = async () => {
    await wait();

    for (const { type, payload } of generator()) {
      await operator[type](payload);

      if (type !== 'done') await wait();

      changeColor(
        payload.filter((i) => temp !== pointer[i]).filter((j) => !doneBlocks.includes(pointer[j])),
        Palette.normal
      );
    }

    await wait();

    cb();
  };

  return (
    <div className="relative h-[200px] w-full">
      {values.map((value, index) => (
        <div
          key={value}
          className="absolute rounded-md bg-gray-300"
          style={{
            left: index * 30,
            top: 200 - value * 20,
            width: 20,
            height: value * 20,
            transition: `left ${_delay.current / 1000}s, top ${_delay.current / 1000}s`,
          }}
          ref={(e: HTMLDivElement) => refs.current.push(e)}
        />
      ))}
    </div>
  );
}

export default Viewer;
