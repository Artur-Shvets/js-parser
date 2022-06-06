import { changeMode } from './src/DarkLightMode/DarkLightMode.js';
import { parserCore } from './src/StructureParse/StructureParse.js';

let parseButton = document.querySelector('.btn-parse');
parseButton.addEventListener('click', () => parserCore());

let changeModeToggle = document.querySelector('#change-mode');
changeModeToggle.addEventListener('click', () => changeMode());
