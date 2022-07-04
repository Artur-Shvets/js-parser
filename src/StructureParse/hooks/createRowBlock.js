import { addColorForBlock, getHighLight } from '../../hooks/index.js';

export function createRowBlock(rowText) {
  let rowBlock = document.createElement('div');
  rowBlock.classList.add('row-block');
  rowBlock = addColorForBlock(rowBlock, rowText);
  rowBlock.innerHTML = getHighLight(rowText);

  return rowBlock;
}
