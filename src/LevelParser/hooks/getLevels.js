export function getLevels(infoList) {
  infoList.parentList.forEach(parentItem => {
    let callNames = [];
    parentItem.callList?.forEach(callItem => {
      callNames.push(callItem.name);
    });
    callNames.length &&
      (parentItem.callNames = [...new Set(callNames)].filter(Boolean));
  });

  let currentLevel = infoList.parentList.map(parent => {
    parent = new Map(Object.entries(parent));
    parent.delete('callList');
    parent = Object.fromEntries(parent);
    parent.getParent = () =>
      infoList.parentList.find(parentItem => parentItem.id == parent.id);
    return parent;
  });

  infoList.levelsList = [];

  let count = 10;
  while (count > 0) {
    count--;
    let nextLevel = [];
    let callNames = [];
    currentLevel.forEach(item => {
      item.callNames && callNames.push(...item.callNames);
    });
    callNames.length && (callNames = [...new Set(callNames)].filter(Boolean));

    currentLevel.forEach((item, i) => {
      if (callNames.includes(item.name)) {
        nextLevel.push(item);
        delete currentLevel[i];
      }
    });

    currentLevel = currentLevel.filter(Boolean);
    if (!currentLevel.length) {
      break;
    }

    infoList.levelsList.push(currentLevel);
    currentLevel = nextLevel;
  }

  return infoList;
}
