export const range = (start: number, end: number) =>
  Array(end - start + 1)
    .fill(start)
    .map((value, index) => value + index);
