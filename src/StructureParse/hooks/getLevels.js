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
    return Object.fromEntries(parent);
  });

  infoList.levelsList = [];

  while (true) {
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
      nextLevel.length &&
        infoList.levelsList[infoList.levelsList.length - 1].push(...nextLevel);
      break;
    }

    infoList.levelsList.push(currentLevel);
    currentLevel = nextLevel;
  }

  console.log('infoList', infoList);
}
