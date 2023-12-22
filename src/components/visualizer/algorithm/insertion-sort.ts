function algorithm(array: number[]) {
  function* generator(array: number[]) {
    yield { type: 'start' };

    for (let i = 1; i < array.length; i++) {
      const temp = array[i];
      let aux = i - 1;

      yield { type: 'store', payload: [i] };

      while (aux >= 0 && array[aux] > temp) {
        yield { type: 'move', payload: [aux, aux + 1] };
        yield { type: 'done', payload: [aux + 1] };

        array[aux + 1] = array[aux];
        aux--;
      }

      array[aux + 1] = temp;

      yield { type: 'restore', payload: [aux + 1] };
      yield { type: 'done', payload: [aux + 1] };
    }

    yield { type: 'end' };

    return array;
  }

  return generator(array);
}

export default algorithm;
