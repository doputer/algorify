import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';

import { UpdateIcon } from '@radix-ui/react-icons';

interface ViewerProps {
  values: number[];
  _pause: MutableRefObject<boolean>;
  _delay: MutableRefObject<number>;
  generator: () => Generator<{ type: string; payload: number[] }>;
  reset: () => void;
}

interface Prop {
  style: {
    left: number;
    top: number;
    width: number;
    height: number;
    transition: string;
  };
  className: string;
}

interface Label {
  pick: number[];
  hold: number[];
  flag: number[];
  done: number[];
}

interface Block {
  key: number;
  index: number;
  value: number;
  action: string;
}

interface Event {
  labels: Label;
  blocks: Block[];
  stores: Block[];
}

function Viewer({ values, _pause, _delay, generator, reset }: ViewerProps) {
  /* Utils */
  const rootRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef(0);

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

  const initEvent = {
    labels: { pick: [], hold: [], flag: [], done: [] },
    blocks: values.map((i, j) => ({ key: j, index: j, value: i, action: '' })),
    stores: [],
  };

  const [event, setEvent] = useState<Event>(initEvent);

  const props = useMemo(() => {
    const { labels, blocks, stores } = event;

    const acc: Prop[] = [];

    [...blocks, ...stores].filter(Boolean).forEach((block) => {
      const { key, index, value, action } = block;

      acc[key] = {
        style: {
          left: index * (sizeRef.current + 10),
          top: action === 'store' ? 0 : 200 - value * 20,
          width: sizeRef.current,
          height: value * 20,
          transition: ['swap', 'move'].includes(action)
            ? `left ${_delay.current / 1000}s`
            : ['store'].includes(action)
              ? `top ${_delay.current / 1000}s`
              : ['restore'].includes(action)
                ? `left ${_delay.current / 2000}s, top ${_delay.current / 2000}s ${
                    _delay.current / 2000
                  }s`
                : ``,
        },
        className: [
          'absolute',
          'rounded-md',
          labels.hold.includes(index) && action !== 'store'
            ? 'bg-hold'
            : labels.flag.includes(index) || action === 'store'
              ? 'bg-flag'
              : labels.pick.includes(index)
                ? 'bg-pick'
                : labels.done.includes(index)
                  ? 'bg-done'
                  : 'bg-idle',
        ]
          .filter(Boolean)
          .join(' '),
      };
    });

    return acc;
  }, [event]);

  /* Operators */
  const pick = (payload: number[]) => {
    setEvent((prev) => {
      const { labels } = prev;

      return {
        ...prev,
        labels: { ...labels, pick: [...payload], hold: [] },
      };
    });
  };

  const swap = (payload: number[]) => {
    const [i, j] = payload;

    setEvent((prev) => {
      const { labels, blocks } = prev;

      [blocks[i], blocks[j]] = [blocks[j], blocks[i]];

      blocks[i].action = 'swap';
      blocks[j].action = 'swap';

      return {
        ...prev,
        labels: { ...labels, pick: [], hold: [...payload] },
        blocks: blocks.map((block, index) => ({ ...block, index })),
      };
    });
  };

  const store = (payload: number[]) => {
    const [i] = payload;

    setEvent((prev) => {
      const { labels, blocks, stores } = prev;

      stores.push({ ...blocks[i], action: 'store' });

      return {
        ...prev,
        labels: { ...labels, flag: [...payload], hold: [] },
      };
    });
  };

  const restore = (payload: number[]) => {
    const [i] = payload;

    setEvent((prev) => {
      const { labels, blocks, stores } = prev;
      const target = stores.pop();

      if (target) blocks[i] = { ...target, action: 'restore' };

      return {
        ...prev,
        labels: { ...labels, hold: [...payload] },
        blocks: blocks.map((block, index) => ({ ...block, index })),
      };
    });
  };

  const move = (payload: number[]) => {
    const [i, j] = payload;

    setEvent((prev) => {
      const { labels, blocks } = prev;

      blocks[j] = blocks[i];

      blocks[j].action = 'move';

      return {
        ...prev,
        labels: { ...labels, hold: [...payload] },
        blocks: blocks.map((block, index) => ({ ...block, index })),
      };
    });
  };

  const flag = (payload: number[]) => {
    setEvent((prev) => {
      const { labels } = prev;

      return {
        ...prev,
        labels: { ...labels, flag: [...payload] },
      };
    });
  };

  const done = (payload: number[]) => {
    setEvent((prev) => {
      const { labels } = prev;

      return {
        ...prev,
        labels: { ...labels, flag: [], done: [...labels.done, ...payload] },
      };
    });
  };

  const start = () => {
    setEvent((prev) => {
      return {
        ...prev,
      };
    });
  };

  const end = () => {
    setEvent((prev) => {
      return {
        ...prev,
        labels: {
          pick: [],
          hold: [],
          flag: [],
          done: [...Array.from({ length: values.length }, (_, i) => i)],
        },
      };
    });
  };

  const operate = async () => {
    for (const { type, payload } of generator()) {
      if (type === 'pick') pick(payload);
      else if (type === 'swap') swap(payload);
      else if (type === 'store') store(payload);
      else if (type === 'restore') restore(payload);
      else if (type === 'move') move(payload);
      else if (type === 'flag') flag(payload);
      else if (type === 'done') done(payload);
      else if (type === 'start') start();
      else if (type === 'end') end();

      if (type !== 'done' && type !== 'flag') await wait();
    }

    await wait();

    reset();
  };

  useEffect(() => {
    operate();
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;

    sizeRef.current = Math.min(
      20,
      ~~((rootRef.current.offsetWidth - 10 * (values.length - 1)) / values.length)
    );
  }, [rootRef]);

  return (
    <div className="relative h-[200px] w-full" ref={rootRef}>
      {!rootRef.current ? (
        <div className="flex h-[200px] w-full items-center justify-center">
          <UpdateIcon
            width={20}
            height={20}
            className="animate-spin stroke-gray-500 dark:stroke-gray-300"
          />
        </div>
      ) : (
        values.map((_, index) => (
          <div key={index} style={props[index].style} className={props[index].className} />
        ))
      )}
    </div>
  );
}

export default Viewer;
