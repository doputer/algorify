import { RefObject, useEffect, useState } from 'react';

const useMeasure = (ref: RefObject<HTMLDivElement>) => {
  const [width, setWidth] = useState(0);

  const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => setWidth(entry.contentRect.width));
  });

  useEffect(() => {
    if (!ref) return;
    if (!ref.current) return;

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return [width];
};

export default useMeasure;
