"use strict"

let inputCode = document.getElementById('input');
let offset;
let selection;
let pathToSelect = [];
let countOfblocks;

function getPosition () {
  selection = window.getSelection();
  let block = selection.anchorNode.parentElement;
  offset = selection.anchorOffset;
  countOfblocks = block.parentElement.children.length;
  pathToSelect = [];
  while (block.id != 'input') {
    let selectIndex = 0;
    while (block.previousSibling != null) {
      block = block.previousSibling;
      selectIndex += 1;
    }
    pathToSelect.push(selectIndex);
    block = block.parentElement;
  }
  pathToSelect.reverse();
}

function addPosition () {
  let block = input;
  pathToSelect.forEach((index) => {
    block = block.children[index];
  })
  if (countOfblocks < block.parentElement.children.length) {
    selection.collapse(block.nextSibling.firstChild, 1);
  } else {
    selection.collapse(block.firstChild, offset);
  }
}

document.addEventListener("keyup", (e) => {
  if (e.keyCode != 17 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40) {
    getPosition();
    parserCore();
  }
})
