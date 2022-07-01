'use strict';

import { changeMode } from './src/DarkLightMode/DarkLightMode.js';
import { input, parserCore } from './src/StructureParse/StructureParse.js';
import { allText } from './src/StructureParse/StructureParse.js';

let parseButton = document.querySelector('.btn-parse');
parseButton.addEventListener('click', () => parserCore());

let changeModeToggle = document.querySelector('#change-mode');
changeModeToggle.addEventListener('click', () => changeMode());

input.addEventListener('paste', e => {
  e.preventDefault();
  allText.push((e.clipboardData || window.clipboardData).getData('text'));
  e.target.innerText = allText.join('\n');
});

let uploadButton = document.querySelector('.btn-upload');
uploadButton.addEventListener('click', () => uploadInput.click());

let uploadInput = document.querySelector('.uploader');
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
