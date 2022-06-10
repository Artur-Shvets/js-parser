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

function readFiles(files) {
  for (let file of files) {
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
