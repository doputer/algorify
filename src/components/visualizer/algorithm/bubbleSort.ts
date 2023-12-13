function bubbleSort(array: number[]) {
  function* generator(array: number[]) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        yield { type: 'compare', payload: [j, j + 1] };

        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          yield { type: 'swap', payload: [j, j + 1] };
        }
      }
      yield { type: 'done', payload: [array.length - i - 1] };
    }

    return array;
  }

  return generator(array);
}

export default bubbleSort;
