import { getHighLight } from './index.js';

export function createRow(rowText, rowBlock, isNewParent = false) {
  rowBlock = document.createElement('div');
  rowBlock.classList.add('row');
  rowBlock.innerHTML = getHighLight(rowText, isNewParent);

  return rowBlock;
}
