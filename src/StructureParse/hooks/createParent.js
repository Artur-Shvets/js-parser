import { addColorForBlock, createRow, input } from '../../hooks/index.js';

export function createParent(
  rowText,
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

  rowBlock = createRow(rowText, mainParent);
  mainParent.append(rowBlock);
  mainBlock = mainParent;

  return [mainParent, mainBlock, subBlock, rowBlock];
}
