import round from 'lodash/round';

export const formatForDisplay = (value?: number | string) => {
  if (typeof value === 'string') {
    return value;
  }
  return value === undefined ? '-' : round(value);
};
