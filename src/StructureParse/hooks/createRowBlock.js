import { addColorForBlock, getHighLight } from './index.js';

export function createRowBlock(rowText, rowBlock) {
  rowBlock = document.createElement('div');
  rowBlock.classList.add('row-block');
  rowBlock = addColorForBlock(rowBlock, rowText);
  rowBlock.innerHTML = getHighLight(rowText);

  return rowBlock;
}
