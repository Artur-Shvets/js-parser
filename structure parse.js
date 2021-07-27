"use strict"

let input = document.getElementById('input');
let inputText;
let openBrace;
let closedBrace;
let mainParent = false;
let subBlock = false;
let rowBlock = false;
let mainBlock = false;
let identBlock;


function addColorForBlock (block, rowText) {
  if (block.classList.contains('row-block')) {
    if (/(let|function|if)/gm.test(rowText)) {
      block.classList.add('purple-shadow');
    }
  } else {
    if (/(let|function|if)/gm.test(rowText)) {
      block.classList.add('purple-shadow');
    } else if (/(for|forEach)\s/gm.test(rowText)) {
      block.classList.add('blue-shadow');
    } else if (/(window|document|console)\./gm.test(rowText)) {
      block.classList.add('orange-shadow');
    }
  }
}

function createParent (rowText) {
  mainParent = document.createElement('div');
  mainParent.classList.add('main-block', 'main-parent');
  mainBlock = mainParent;
  mainParent.setAttribute('contenteditable', 'true');
  addColorForBlock (mainParent, rowText);
  input.append(mainParent);
  createRow(rowText);
  mainParent.append(rowBlock);
}

function createMainBlock (rowText) {
  mainBlock = document.createElement('div');
  mainBlock.classList.add('main-block');
  subBlock.append(mainBlock);
  addColorForBlock(mainBlock, rowText);
  createRow(rowText);
  mainBlock.append(rowBlock);
  createSubBlock();
  mainBlock.append(subBlock);
}

function createSubBlock () {
  subBlock = document.createElement('div');
  subBlock.classList.add('sub-block');
  mainBlock.append(subBlock);
}


function createRowBlock (rowText) {
  rowBlock = document.createElement('div');
  rowBlock.classList.add('row-block');
  rowText = rowText.replace(/^\s+/, (g0, index) => {
    return ''
  });
  addColorForBlock(rowBlock, rowText);
  rowBlock.innerHTML = getHighlightText(rowText);
}

function createRow (rowText) {
  rowBlock = document.createElement('div');
  rowBlock.classList.add('row');
  rowText = rowText.replace(/^\s+/, (g0, index) => {
    return ''
  });
  rowBlock.innerHTML = getHighlightText(rowText);
}

function createIndent () {
  identBlock = document.createElement('div');
  identBlock.classList.add('ident-block');
  input.append(identBlock);
}

function getPreviousBlocks () {
  if (mainBlock.classList.contains('main-parent') != true) {
    subBlock = subBlock.parentElement;
    mainBlock = mainBlock.parentElement;
    subBlock = subBlock.parentElement;
    mainBlock = mainBlock.parentElement;
  } else {
    mainParent = false
  }
}

let countIdent = 0;
function parcerCore() {
  inputText = input.innerText.split('\n');
  input.innerText = null;
  inputText.forEach((rowText) => {
    openBrace = /{$/gm.test(rowText);
    closedBrace = /^\s*?}/gm.test(rowText);
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
      mainBlock = rowBlock.parentElement;
      mainBlock = mainBlock.parentElement;
      if (rowBlock.parentElement.classList.contains('main-block')) {
        mainBlock = mainBlock.parentElement;
      }
      createRow(rowText);
      mainBlock.append(rowBlock);
      createSubBlock();
    } else {
      if (mainParent) {
        createRowBlock(rowText);
        subBlock.append(rowBlock);
      } else {
        if (rowText.length == 0) {
          countIdent += 1;
          if (countIdent % 2 == 0) {
            countIdent = 0;
            createIndent();
          }
        } else {
          createParent(rowText);
          mainParent = false;
        }
      }
    }
  })
}
