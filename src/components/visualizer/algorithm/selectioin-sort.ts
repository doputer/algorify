function algorithm(array: number[]) {
  function* generator(array: number[]) {
    for (let i = 0; i < array.length - 1; i++) {
      let indexMin = i;

      for (let j = i + 1; j < array.length; j++) {
        yield { type: 'access', payload: [i, j] };

        if (array[j] < array[indexMin]) {
          indexMin = j;
        }
      }

      [array[i], array[indexMin]] = [array[indexMin], array[i]];

      if (i !== indexMin) yield { type: 'swap', payload: [i, indexMin] };
      yield { type: 'done', payload: [i] };
    }

    yield { type: 'done', payload: [array.length - 1] };

    return array;
  }

  return generator(array);
}

export default algorithm;
