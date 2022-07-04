import { input, mapSpace, svgSpace, doDynamicAllLinks } from './index.js';

export function createEvents(infoList) {
  let levelColumns = mapSpace.querySelectorAll('.level');
  svgSpace.onmouseenter = e => {
    e.stopPropagation();
  };

  let parentBlockList = mapSpace.querySelectorAll('.main-block');
  parentBlockList.forEach(parentItem => {
    parentItem.onmousedown = e => {
      let parentItem = infoList.parentList.find(
        item => item.id === e.target.id
      );
      input.innerHTML = parentItem.html;
    };
  });

  levelColumns.forEach(levelColumn => {
    mapSpace.onmouseleave = e => {
      mapSpace.style.gridTemplateColumns = `repeat(${infoList.levelsList.length}, 1fr)`;
    };
  });
}
