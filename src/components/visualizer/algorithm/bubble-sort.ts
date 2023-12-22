function algorithm(array: number[]) {
  function* generator(array: number[]) {
    yield { type: 'start' };

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        yield { type: 'pick', payload: [j, j + 1] };

        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          yield { type: 'swap', payload: [j, j + 1] };
        }
      }
      yield { type: 'done', payload: [array.length - i - 1] };
    }

    yield { type: 'end' };

    return array;
  }

  return generator(array);
}

export default algorithm;
