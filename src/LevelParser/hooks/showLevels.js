import { mapSpace } from '../../hooks/index.js';

export function showLevels(levelsList) {
  mapSpace.style.gridTemplateColumns = `repeat(${levelsList.length}, 1fr)`;

  levelsList.forEach(level => {
    let levelColumn = document.createElement('div');
    levelColumn.classList.add('level');

    level.forEach(item => {
      let mainBlock = document.createElement('div');
      mainBlock.classList.add('main-block', item.role, item.name);
      mainBlock.id = item.id;

      let rowBlock = document.createElement('div');
      rowBlock.classList.add('row');
      switch (item.role) {
        case 'function':
          rowBlock.innerHTML = `<span class="blue-string">${item.name}</span>`;
          break;
        case 'component':
          rowBlock.innerHTML = `<span class="blue-string">${item.name}</span>`;
          break;
        case 'variable':
          rowBlock.innerHTML = `<span class="white-string">${item.name}</span>`;
          break;
      }
      mainBlock.append(rowBlock);

      levelColumn.append(mainBlock);
    });

    mapSpace.append(levelColumn);
  });
}
