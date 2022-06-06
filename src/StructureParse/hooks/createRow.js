import { getHighLight } from './index.js';

export function createRow(rowText, rowBlock) {
  rowBlock = document.createElement('div');
  rowBlock.classList.add('row');
  rowBlock.innerHTML = getHighLight(rowText);

  return rowBlock;
}
