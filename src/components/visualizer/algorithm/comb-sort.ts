function algorithm(array: number[]) {
  function* generator(array: number[]) {
    yield { type: 'start' };

    const shrink = 1.3;
    let gap = array.length;
    let sorted = false;

    while (!sorted) {
      gap = Math.floor(gap / shrink);

      if (gap > 1) sorted = false;
      else {
        gap = 1;
        sorted = true;
      }

      let i = 0;

      while (i + gap < array.length) {
        yield { type: 'pick', payload: [i, i + gap] };

        if (array[i] > array[i + gap]) {
          yield { type: 'swap', payload: [i, i + gap] };

          [array[i], array[i + gap]] = [array[i + gap], array[i]];
          sorted = false;
        }

        i++;
      }
    }

    yield { type: 'end' };

    return array;
  }

  return generator(array);
}

export default algorithm;
