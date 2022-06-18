import { addColorForBlock, createRow } from './index.js';

export function createParent(
  rowText,
  input,
  mainParent,
  mainBlock,
  subBlock,
  rowBlock
) {
  mainParent = document.createElement('div');
  mainParent.classList.add('main-block', 'main-parent');
  mainParent.setAttribute('contenteditable', 'false');
  mainParent = addColorForBlock(mainParent, rowText);
  input.append(mainParent);
  rowBlock = createRow(rowText, rowBlock, true);
  mainParent.append(rowBlock);
  mainBlock = mainParent;

  return [input, mainParent, mainBlock, subBlock, rowBlock];
}
