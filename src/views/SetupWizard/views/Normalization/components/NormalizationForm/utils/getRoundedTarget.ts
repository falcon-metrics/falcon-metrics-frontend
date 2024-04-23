import floor from 'lodash/floor';

export const getRoundedTarget = (numberOfValues: number) => {
  const percentage = 100 / numberOfValues;
  return floor(percentage, 2);
};
