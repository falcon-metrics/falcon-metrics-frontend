export const dataIsEmpty = (data: any) => {
  const isEmptyArray = Array.isArray(data) && !data.length;
  return !data || isEmptyArray;
};
