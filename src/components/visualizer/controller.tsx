import { MutableRefObject, useState } from 'react';

import { PauseIcon, PlayIcon } from '@radix-ui/react-icons';

interface ControllerProps {
  _pause: MutableRefObject<boolean>;
  _delay: MutableRefObject<number>;
}

function Controller({ _pause, _delay }: ControllerProps) {
  const [pause, setPause] = useState(_pause.current);
  const [delay, setDelay] = useState(_delay.current);

  const changePause = () => {
    setPause(!pause);
    _pause.current = !_pause.current;
  };

  const changeSpeed = () => {
    if (500 / delay === 16) {
      setDelay(500);
      _delay.current = 500;
      return;
    }

    setDelay(delay / 2);
    _delay.current = _delay.current / 2;
  };

  return (
    <div className="flex items-center gap-2 stroke-black stroke-2 text-xl font-bold">
      <button
        onClick={() => changePause()}
        className="rounded-full bg-[#d1d5db] p-1"
        aria-label={pause ? 'play_button' : 'pause_button'}
      >
        {pause ? <PlayIcon /> : <PauseIcon />}
      </button>
      <button onClick={() => changeSpeed()} aria-label="delay_button">
        {500 / _delay.current}x
      </button>
    </div>
  );
}

export default Controller;
