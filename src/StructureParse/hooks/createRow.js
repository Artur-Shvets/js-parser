import { getHighLight } from '../../hooks/index.js';

export function createRow(rowText, mainParent) {
  let rowBlock = document.createElement('div');
  rowBlock.classList.add('row');

  rowBlock.innerHTML = getHighLight(rowText, mainParent);

  return rowBlock;
}
