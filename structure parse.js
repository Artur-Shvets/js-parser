'use strict';

let input = document.getElementById('input');
let inputText;
let openBrace;
let closedBrace;
let mainParent = false;
let subBlock = false;
let rowBlock = false;
let mainBlock = false;
let identBlock;

function addColorForBlock(block, rowText) {
  if (block.classList.contains('row-block')) {
    if (/\b(let|function|if)\b/gm.test(rowText)) {
      block.classList.add('purple-shadow');
    }
  } else {
    if (/\b(let|function|if)\b/gm.test(rowText)) {
      block.classList.add('purple-shadow');
    } else if (/\b(for|forEach)\b/gm.test(rowText)) {
      block.classList.add('blue-shadow');
    } else if (/(window|document|console)\./gm.test(rowText)) {
      block.classList.add('orange-shadow');
    }
  }
}

function createParent(rowText) {
  mainParent = document.createElement('div');
  mainParent.classList.add('main-block', 'main-parent');
  mainBlock = mainParent;
  mainParent.setAttribute('contenteditable', 'true');
  addColorForBlock(mainParent, rowText);
  input.append(mainParent);
  createRow(rowText);
  mainParent.append(rowBlock);
}

function createMainBlock(rowText) {
  mainBlock = document.createElement('div');
  mainBlock.classList.add('main-block');
  subBlock.append(mainBlock);
  addColorForBlock(mainBlock, rowText);
  createRow(rowText);
  mainBlock.append(rowBlock);
  createSubBlock();
  mainBlock.append(subBlock);
}

function createSubBlock() {
  subBlock = document.createElement('div');
  subBlock.classList.add('sub-block');
  mainBlock.append(subBlock);
}

function createRowBlock(rowText) {
  rowBlock = document.createElement('div');
  rowBlock.classList.add('row-block');
  addColorForBlock(rowBlock, rowText);
  rowBlock.innerHTML = getHighlightText(rowText);
}

function createRow(rowText) {
  rowBlock = document.createElement('div');
  rowBlock.classList.add('row');
  rowBlock.innerHTML = getHighlightText(rowText);
}

function createEmpty() {
  rowBlock = document.createElement('br');
}

function getPreviousBlocks() {
  if (mainBlock.classList.contains('main-parent') != true) {
    subBlock = mainBlock.parentElement;
    mainBlock = subBlock.parentElement;
  } else {
    mainParent = false;
    mainBlock = false;
    subBlock = false;
  }
}

let emptyRows = 0;
function checkIsEmpty(rowText) {
  if (!rowText) {
    emptyRows++;
    if (emptyRows == 2) {
      emptyRows = 0;
      return false;
    } else {
      return true;
    }
  }
  if (rowText && emptyRows == 1) {
    emptyRows = 0;
    return false;
  }
}

function parserCore() {
  inputText = input.innerText.split('\n');
  input.innerText = null;
  inputText.forEach(rowText => {
    rowText = rowText.replace(/^\s*/, '');
    let isEmpty = checkIsEmpty(rowText);
    if (isEmpty || rowText) {
      openBrace = /[{[(]\s*(\/\/|$)/g.test(rowText);
      closedBrace = /^\s*?[}\])]/g.test(rowText);
      if (openBrace && !closedBrace) {
        if (mainParent) {
          createMainBlock(rowText);
        } else {
          createParent(rowText);
          createSubBlock();
        }
      } else if (!openBrace && closedBrace) {
        createRow(rowText);
        mainBlock.append(rowBlock);
        getPreviousBlocks();
      } else if (openBrace && closedBrace) {
        createRow(rowText);
        mainBlock.append(rowBlock);
        createSubBlock();
      } else {
        if (mainParent) {
          if (isEmpty) {
            createEmpty();
          } else {
            createRowBlock(rowText);
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
            createParent(rowText);
            mainParent = false;
            mainBlock = false;
            subBlock = false;
          }
        }
      }
    }
  });
}
