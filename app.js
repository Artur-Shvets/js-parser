'use strict';

import {
  structureParse,
  runLevelParser,
  createEvents,
  changeMode,
  doDynamicAllLinks,
  allText,
  parseButton,
  changeModeToggle,
  uploadButton,
  uploadInput,
  input,
  separator,
  main,
  infoList,
} from './src/hooks/index.js';

function runParserCors() {
  structureParse();
  runLevelParser(infoList);
  createEvents(infoList);
  console.log('infoList >>>', infoList);
}

parseButton.addEventListener('click', () => runParserCors());

changeModeToggle.addEventListener('click', () => changeMode());

input.addEventListener('paste', e => {
  e.preventDefault();
  allText.push((e.clipboardData || window.clipboardData).getData('text'));
  e.target.innerText = allText.join('\n');
});

uploadButton.addEventListener('click', () => uploadInput.click());

uploadInput.addEventListener('change', e => readFiles(e.target.files));

input.addEventListener('drop', e => {
  e.preventDefault();
  readFiles(e.dataTransfer.files);
});

function readFiles(files) {
  for (let file of files) {
    if (/\.(js|jsx|ts|tsx)$/.test(file.name)) {
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        allText.push(reader.result);
        input.innerText += reader.result + '\n';
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  }
}

// ___________________________________ FLOW CHART _____________________________________

let mouseDown = { separator: false };

separator.addEventListener('mousedown', e => {
  mouseDown.separator = true;
});

main.onmousemove = e => {
  if (mouseDown.separator) {
    main.style.gridTemplateColumns = `${e.clientX - 12}px 5px auto`;
    doDynamicAllLinks();
  }
};

document.onmouseup = e => {
  mouseDown.separator = mouseDown.separator && false;
};
