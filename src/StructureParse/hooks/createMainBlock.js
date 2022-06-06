import { addColorForBlock, createRow, createSubBlock } from './index.js';

export function createMainBlock(rowText, input, mainBlock, subBlock, rowBlock) {
  // let [input, mainParent, mainBlock, subBlock, rowBlock] = allBlocks;

  mainBlock = document.createElement('div');
  mainBlock.classList.add('main-block');
  subBlock.append(mainBlock);
  mainBlock = addColorForBlock(mainBlock, rowText);
  rowBlock = createRow(rowText, rowBlock);
  mainBlock.append(rowBlock);
  [subBlock, mainBlock] = createSubBlock(subBlock, mainBlock);
  mainBlock.append(subBlock);

  return [input, mainBlock, subBlock, rowBlock];
}
