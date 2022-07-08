import { input, mapSpace, svgSpace, doDynamicAllLinks } from './index.js';

// let itemsLength = infoList.levelsList.length;

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

  mapSpace.onmouseleave = e => {
    levelColumns.forEach(level => {
      level.classList = 'level';
      level.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    });

    // e.target.style.gridTemplateColumns = `repeat(${infoList.levelsList.length}, 1fr)`;
    doDynamicAllLinks();
  };

  levelColumns.forEach((levelColumn, levelIndex) => {
    levelColumn.onmouseenter = e => {
      let itemsLength = infoList.levelsList.length;
      let rightItems = itemsLength - levelIndex - 1;

      let leftItems = itemsLength - rightItems - 1;

      // let classNameGrid = '';
      let fraction = leftItems < rightItems ? rightItems - leftItems : 0;
      let maxVal = Math.max(leftItems, rightItems) + 1;
      levelColumns.forEach((level, i) => {
        let className = false;
        if (i < levelIndex) {
          className = 'left-shadow';
          fraction++;
        }
        if (i === levelIndex) {
          fraction++;
        }
        if (i > levelIndex) {
          className = 'right-shadow';
          fraction--;
        }

        className && level.classList.add(className);
        let background =
          i === levelIndex
            ? `rgba(0, 0, 0, 0)`
            : `rgba(0, 0, 0, 0.${maxVal - fraction})`;
        let width = `${fraction * (100 / itemsLength)}%`;
        console.log(width);

        i === levelIndex && (level.classList = 'level');
        level.style.width = width;
        level.style.backgroundColor = background;
      });

      // повторить с интервалом 2 секунды
      let timerId = setInterval(() => doDynamicAllLinks(), 10);

      // остановить вывод через 5 секунд
      setTimeout(() => {
        clearInterval(timerId);
        doDynamicAllLinks();
      }, 600);
    };
  });
}
