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
  getLevels,
  getHighLight,
  infoList,
} from './hooks/index.js';

export let input = document.getElementById('input');
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

export function parserCore() {
  getAllDeclarations(input.innerText);
  inputText = input.innerText.split('\n');
  input.innerText = null;
  inputText.forEach(rowText => {
    rowText = rowText.replace(/^\s*/, '');

    [isEmpty, emptyRowsCount] = checkIsEmpty(rowText, isEmpty, emptyRowsCount);
    if (isEmpty || rowText) {
      if (!isEmpty) {
        rowText = getHighLight(rowText, false, true);
      }

      openBrace =
        patterns.openAngle.test(rowText) || patterns.openBrackets.test(rowText);
      closedBrace =
        patterns.closedAngle.test(rowText) ||
        patterns.closedBrackets.test(rowText);

      if (openBrace && !closedBrace) {
        if (mainParent) {
          [input, mainBlock, subBlock, rowBlock] = createMainBlock(
            rowText,
            input,
            mainBlock,
            subBlock,
            rowBlock
          );
        } else {
          [input, mainParent, mainBlock, subBlock, rowBlock] = createParent(
            rowText,
            input,
            mainParent,
            mainBlock,
            subBlock,
            rowBlock
          );
          [subBlock, mainBlock] = createSubBlock(subBlock, mainBlock);
        }
      } else if (!openBrace && closedBrace && mainBlock) {
        rowBlock = createRow(rowText, rowBlock);
        mainBlock.append(rowBlock);
        [mainParent, mainBlock, subBlock] = getPreviousBlocks(
          mainParent,
          mainBlock,
          subBlock
        );
      } else if (openBrace && closedBrace) {
        rowBlock = createRow(rowText, rowBlock);
        mainBlock.append(rowBlock);
        [subBlock, mainBlock] = createSubBlock(subBlock, mainBlock);
      } else {
        if (mainParent) {
          if (isEmpty) {
            createEmpty();
          } else {
            rowBlock = createRowBlock(rowText, rowBlock);
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
            createParent(
              rowText,
              input,
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
  console.log('parentList >>>', infoList);
  // getLevels(input);
}
