import {
  createAllLinks,
  doDynamicAllLinks,
  getLevels,
  showLevels,
  input,
} from '../hooks/index.js';

export function runLevelParser(infoList) {
  infoList = getLevels(infoList);
  infoList.parentList.forEach(parentItem => {
    let parentBlock = input.querySelector(`#${parentItem.id}`);
    parentItem.html = parentBlock.outerHTML;
  });

  input.innerText = null;

  showLevels([...infoList.levelsList].reverse());
  createAllLinks(infoList.parentList);
  doDynamicAllLinks();
  input.innerHTML = infoList.levelsList[0][0].getParent().html;

  return infoList;
}
