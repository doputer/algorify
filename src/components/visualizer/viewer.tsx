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
  left: number;
  top: number;
  width: number;
  height: number;
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
  x: number;
  value: number;
  store: boolean;
  visible: boolean;
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
    blocks: values.map((i, j) => ({ key: j, x: j, value: i, store: false, visible: true })),
    stores: [],
  };

  const [event, setEvent] = useState<Event>(initEvent);

  const props = useMemo(() => {
    const { labels, blocks, stores } = event;

    const acc: Prop[] = [];

    [...blocks, ...stores].filter(Boolean).forEach((block) => {
      const { key, x, value, store, visible } = block;

      acc[key] = {
        left: x * (sizeRef.current + 10),
        top: store ? 0 : 200 - value * 20,
        width: sizeRef.current,
        height: value * 20,
        className: [
          'absolute',
          'rounded-md',
          'bg-[#d1d5db]',
          !visible && 'invisible',
          (labels.flag.includes(x) || store) && 'bg-flag',
          labels.pick.includes(x) && 'bg-pick',
          !store && labels.hold.includes(x) && 'bg-hold',
          !store && !labels.hold.includes(x) && labels.done.includes(x) && 'bg-done',
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

      return {
        ...prev,
        labels: { ...labels, pick: [], hold: [...payload] },
        blocks: blocks.map((block, index) => ({ ...block, x: index })),
      };
    });
  };

  const store = (payload: number[]) => {
    const [i] = payload;

    setEvent((prev) => {
      const { labels, blocks, stores } = prev;

      stores.push({ ...blocks[i], store: true });
      blocks[i].visible = false;

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

      if (target) blocks[i] = { ...target, store: false };

      return {
        ...prev,
        labels: { ...labels, hold: [...payload] },
        blocks: blocks.map((block, index) => ({ ...block, x: index })),
      };
    });
  };

  const move = (payload: number[]) => {
    const [i, j] = payload;

    setEvent((prev) => {
      const { labels, blocks } = prev;

      blocks[j] = blocks[i];

      return {
        ...prev,
        labels: { ...labels, hold: [...payload] },
        blocks: blocks.map((block, index) => ({ ...block, x: index })),
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
          <div
            key={index}
            className={props[index].className}
            style={{
              top: props[index].top,
              left: props[index].left,
              width: props[index].width,
              height: props[index].height,
              transition: `left ${_delay.current / 1000}s, top ${_delay.current / 1000}s`,
            }}
          />
        ))
      )}
    </div>
  );
}

export default Viewer;
