import {
  createParent,
  createRow,
  createMainBlock,
  createSubBlock,
  createRowBlock,
  getPreviousBlocks,
  checkIsEmpty,
  patterns,
  getAllDeclarations,
  getHighLight,
  input
} from '../hooks/index.js';

export let allText = [];
let inputText;
let openBrace;
let closedBrace;
let mainParent = false;
let subBlock = false;
let rowBlock = false;
let mainBlock = false;
let emptyRowsCount = 0;
let isEmpty = false;

function createEmpty() {
  rowBlock = document.createElement('br');
}

export function structureParse() {
  getAllDeclarations(allText.join('\n'));
  inputText = allText.join('\n').split('\n');
  input.innerText = null;
  inputText.forEach(rowText => {
    rowText = rowText.replace(/^\s*/, '');

    [isEmpty, emptyRowsCount] = checkIsEmpty(rowText, isEmpty, emptyRowsCount);
    if (isEmpty || rowText) {
      if (!isEmpty) {
        rowText = getHighLight(rowText, false, true);
      }

      let isTag =
        patterns.openAngle.test(rowText) || patterns.closedAngle.test(rowText);
      openBrace =
        patterns.openAngle.test(rowText) || patterns.openBrackets.test(rowText);
      closedBrace =
        patterns.closedAngle.test(rowText) ||
        patterns.closedBrackets.test(rowText);

      if (openBrace && !closedBrace) {
        if (mainParent) {
          [mainBlock, subBlock, rowBlock] = createMainBlock(
            rowText,
            mainBlock,
            subBlock,
            rowBlock
          );
        } else {
          [mainParent, mainBlock, subBlock, rowBlock] = createParent(
            rowText,
            mainParent,
            mainBlock,
            subBlock,
            rowBlock
          );
          subBlock = createSubBlock(subBlock, mainBlock);
        }
      } else if (!openBrace && closedBrace && mainBlock) {
        rowBlock = createRow(rowText);
        mainBlock.append(rowBlock);
        [mainParent, mainBlock, subBlock] = getPreviousBlocks(
          mainParent,
          mainBlock,
          subBlock
        );
      } else if (openBrace && closedBrace) {
        if (isTag) {
          rowBlock = createRowBlock(rowText);
          subBlock.append(rowBlock);
        } else {
          rowBlock = createRow(rowText);
          mainBlock.append(rowBlock);
          subBlock = createSubBlock(subBlock, mainBlock);
        }
      } else {
        if (mainParent) {
          if (isEmpty) {
            createEmpty();
          } else {
            rowBlock = createRowBlock(rowText);
          }

          if (subBlock) {
            subBlock.append(rowBlock);
          } else {
            mainBlock.append(rowBlock);
          }
        } else {
          if (isEmpty) {
            createEmpty();
            input.append(rowBlock);
          } else {
            [mainParent, mainBlock, subBlock, rowBlock] = createParent(
              rowText,
              mainParent,
              mainBlock,
              subBlock,
              rowBlock
            );

            mainParent = false;
            mainBlock = false;
            subBlock = false;
          }
        }
      }
    }
  });
}
