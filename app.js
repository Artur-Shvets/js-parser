'use strict';

import { changeMode } from './src/DarkLightMode/DarkLightMode.js';
import { parserCore } from './src/StructureParse/StructureParse.js';
import { input } from './src/StructureParse/StructureParse.js';

let parseButton = document.querySelector('.btn-parse');
parseButton.addEventListener('click', () => parserCore());

let changeModeToggle = document.querySelector('#change-mode');
changeModeToggle.addEventListener('click', () => changeMode());

let uploadInput = document.querySelector('.uploader');
uploadInput.addEventListener('change', e => readFiles(e.target.files));

let uploadButton = document.querySelector('.btn-upload');
uploadButton.addEventListener('click', () => uploadInput.click());

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
        input.innerText = reader.result + '\n' + input.innerText;
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  }
}
