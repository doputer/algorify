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

function Viewer({ values, _pause, _delay, cb, generator }: ViewerProps) {
  const refs = useRef<HTMLDivElement[]>([]);
  const array = Array.from({ length: values.length }, (_, i) => i);

  useEffect(() => {
    operate();
  }, []);

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

  const changeColor = (target: HTMLDivElement, color: string) => {
    target.style.backgroundColor = color;
  };

  const operate = async () => {
    let done: number[] = [];
    let temp: number = -1;

    await wait();

    for (const operation of generator()) {
      const { type, payload } = operation;

      if (type === 'compare') {
        payload.forEach((val) => changeColor(refs.current[array[val]], Palette.pick));
      } else if (type === 'swap') {
        const [p1, p2] = payload;

        payload.forEach((val) => changeColor(refs.current[array[val]], Palette.hold));

        const ref1 = refs.current[array[p1]];
        const ref2 = refs.current[array[p2]];

        [ref1.style.left, ref2.style.left] = [ref2.style.left, ref1.style.left];
        [array[p1], array[p2]] = [array[p2], array[p1]];
      } else if (type === 'store') {
        const [p1] = payload;

        temp = array[p1];

        refs.current[array[p1]].style.top = '0px';

        payload.forEach((val) => changeColor(refs.current[array[val]], Palette.pick));
      } else if (type === 'restore') {
        const [p1] = payload;

        array[p1] = temp;
        temp = -1;

        const ref1 = refs.current[array[p1]];

        ref1.style.left = `${p1 * 30}px`;

        await wait();

        ref1.style.setProperty('top', `calc(200px - ${ref1.style.height})`);
      } else if (type === 'move') {
        const [p1, p2] = payload;

        const ref1 = refs.current[array[p1]];

        ref1.style.setProperty('left', `calc(${ref1.style.left} + 30px)`);

        [p1].forEach((val) => changeColor(refs.current[array[val]], Palette.hold));

        array[p2] = array[p1];
      } else if (type === 'done') {
        done = done.concat(payload.map((val) => array[val]));
        payload.forEach((val) => changeColor(refs.current[array[val]], Palette.done));
      }

      await wait();

      payload.forEach(
        (val) => temp !== array[val] && changeColor(refs.current[array[val]], Palette.normal)
      );

      done.forEach((val) => changeColor(refs.current[val], Palette.done));
    }

    await wait();

    cb();
  };

  return (
    <div className="relative h-[200px] w-full">
      {values.map((value, index) => (
        <div
          key={value}
          className={`absolute left-0 top-0 flex items-end justify-center rounded-md bg-gray-300`}
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
