import { addColorForBlock, createRow, createSubBlock } from './index.js';

export function createMainBlock(rowText, mainBlock, subBlock, rowBlock) {
  mainBlock = document.createElement('div');
  mainBlock.classList.add('main-block');
  subBlock.append(mainBlock);
  mainBlock = addColorForBlock(mainBlock, rowText);
  rowBlock = createRow(rowText);
  mainBlock.append(rowBlock);
  subBlock = createSubBlock(subBlock, mainBlock);

  return [mainBlock, subBlock, rowBlock];
}
