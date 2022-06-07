import { addColorForBlock, createRow } from './index.js';

export function createParent(
  rowText,
  input,
  mainParent,
  mainBlock,
  subBlock,
  rowBlock
) {
  // let [input, mainParent, mainBlock, subBlock, rowBlock] = allBlocks;

  mainParent = document.createElement('div');
  mainParent.classList.add('main-block', 'main-parent');
  mainBlock = mainParent;
  mainParent.setAttribute('contenteditable', 'true');
  mainParent = addColorForBlock(mainParent, rowText);
  input.append(mainParent);
  rowBlock = createRow(rowText, rowBlock);
  mainParent.append(rowBlock);

  return [input, mainParent, mainBlock, subBlock, rowBlock];
}
