// This is the equivalent of the PERCENTRANK.INC function in Excel, Google Sheets, etc
// https://support.office.com/en-us/article/percentrank-function-f1b5836c-9619-4847-9fc9-080ec9024442 has examples
// Note: OpenOffice and LibreOffice use a different algorithm so results may differ
// This version is more tolerant of values outside of the minimum/maximum and will return 0 or 1
// accordingly
export function getPercentRank(entries: Array<number>, target: number): number {
  // Ranking needs the entries sorted. Don't assume the caller actually did that
  const sortedEntries = entries.sort(
    (firstEl: number, secondEl: number) => firstEl - secondEl,
  );
  const countOfEntries = sortedEntries.length;

  if (countOfEntries === 0) {
    return 0.0;
  }

  // If the target is actually equal or less than the lowest value, then we know it's 0
  if (target <= sortedEntries[0]) {
    return 0.0;
  }

  // Similarly if we're at or above the highest entry then we have 100%
  if (target >= sortedEntries[countOfEntries - 1]) {
    return 1.0;
  }

  let countOfEntriesUnderTarget = 0;

  let entryIndex = 0;

  for (
    ;
    entryIndex < countOfEntries && sortedEntries[entryIndex] < target;
    entryIndex++
  ) {
    countOfEntriesUnderTarget++;
  }

  if (sortedEntries[entryIndex] === target) {
    return countOfEntriesUnderTarget / (countOfEntries - 1);
  }

  // The target is not a value in the array, we need to position it in an imaginary place between its nearest values
  const lowerEntry = sortedEntries[entryIndex - 1];
  const higherEntry = sortedEntries[entryIndex];
  const virtualPosition = (target - lowerEntry) / (higherEntry - lowerEntry);

  return (
    getPercentRank(sortedEntries, lowerEntry) +
    virtualPosition *
      (getPercentRank(sortedEntries, higherEntry) -
        getPercentRank(sortedEntries, lowerEntry))
  );
}
