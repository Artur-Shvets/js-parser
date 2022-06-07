'use strict';

import {
  createParent,
  createRow,
  createMainBlock,
  createSubBlock,
  createRowBlock,
  getPreviousBlocks,
  checkIsEmpty,
  patterns,
} from './hooks/index.js';

let input = document.getElementById('input');
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
  inputText = input.innerText.split('\n');
  input.innerText = null;
  inputText.forEach(rowText => {
    rowText = rowText.replace(/^\s*/, '');

    [isEmpty, emptyRowsCount] = checkIsEmpty(rowText, isEmpty, emptyRowsCount);
    if (isEmpty || rowText) {
      if (/(<.*?|.*?>)\s*?(\/\/|$)/g.test(rowText)) {
        openBrace = /<[^\/]+>?$/g.test(rowText);
        closedBrace = /^\s*?(<\/.*?>|\/>)\s*?(\/\/|$)/g.test(rowText);
        // if (openBrace && closedBrace) {
        //   openBrace = false;
        //   closedBrace = false;
        // }
      } else {
        openBrace = /(\{|\[|\(|:)\s*(\/\/|$)/g.test(rowText);
        closedBrace = /^\s*?(\}|\]|\))/g.test(rowText);
      }

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
      } else if (!openBrace && closedBrace) {
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
}
