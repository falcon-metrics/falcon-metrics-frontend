export const fillMissingValues = (
  v: number | undefined,
  i: number,
  arr: (number | undefined)[],
) => {
  if (v !== undefined) {
    return v;
  }
  const isFirst = i === 0;
  const offset = isFirst ? 1 : -1;
  return arr[i + offset] ?? 0;
};

export const fillMissingValuesToArray = (
  arrayValue: any[],
  i: number,
  arr: any,
) => {
  if (!arrayValue || arrayValue?.length === 0) {
    return arrayValue;
  }
  const isFirst = i === 0;
  let offset = isFirst ? 1 : -1;
  if (!arr?.[i + offset]?.[1]) {
    offset = isFirst ? 2 : -2;
    if (!arr?.[i + offset]?.[1]) {
      offset = isFirst ? 3 : -3;
      if (!arr?.[i + offset]?.[1]) {
        offset = isFirst ? 4 : -4;
        if (!arr?.[i + offset]?.[1]) {
          offset = isFirst ? 5 : -5;
        }
      }
    }
  }
  return arr?.[i + offset]?.[1] ?? 0;
};
