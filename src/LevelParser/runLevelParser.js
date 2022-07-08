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

  infoList.levelsList[0] &&
    (input.innerHTML = infoList.levelsList[0][0].getParent().html);
  // console.log(infoList);

  // return infoList;
}
