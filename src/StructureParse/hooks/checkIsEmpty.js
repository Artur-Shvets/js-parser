export function checkIsEmpty(rowText, isEmpty, emptyRowsCount) {
  if (!rowText) {
    emptyRowsCount++;
    if (emptyRowsCount == 2) {
      emptyRowsCount = 0;
      isEmpty = false;
    } else {
      isEmpty = true;
    }
  }
  if (rowText && emptyRowsCount == 1) {
    emptyRowsCount = 0;
    isEmpty = false;
  }

  return [isEmpty, emptyRowsCount];
}
