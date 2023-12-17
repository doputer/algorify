function algorithm(array: number[]) {
  function* generator(array: number[]) {
    let left = 0;
    let right = array.length - 1;

    while (1) {
      for (let i = left; i < right; i++) {
        yield { type: 'pick', payload: [i, i + 1] };

        if (array[i] > array[i + 1]) {
          yield { type: 'swap', payload: [i, i + 1] };
          [array[i], array[i + 1]] = [array[i + 1], array[i]];
        }
        if (left + 1 === right) {
          yield { type: 'end', payload: [] };

          return array;
        }
      }

      yield { type: 'done', payload: [right] };

      right--;

      for (let i = right; i > left; i--) {
        yield { type: 'pick', payload: [i - 1, i] };

        if (array[i - 1] > array[i]) {
          yield { type: 'swap', payload: [i - 1, i] };
          [array[i - 1], array[i]] = [array[i], array[i - 1]];
        }
        if (left + 1 === right) {
          yield { type: 'end', payload: [] };

          return array;
        }
      }

      yield { type: 'done', payload: [left] };

      left++;
    }

    return array;
  }

  return generator(array);
}

export default algorithm;
