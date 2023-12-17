function algorithm(array: number[]) {
  function* generator(array: number[], min = 0, max = array.length) {
    if (max - min <= 1) return array;

    const [pivot, left, right]: [number, number[], number[]] = [array[min], [], []];

    for (let i = min + 1; i < max; i++) {
      if (array[i] < pivot) left.push(array[i]);
      else right.push(array[i]);

      array.splice(min, i - min + 1, ...left.concat(pivot, right));

      yield array;
    }

    yield* generator(array, min, min + left.length);
    yield* generator(array, min + left.length + 1, max);
  }

  return generator(array);
}

export default algorithm;
