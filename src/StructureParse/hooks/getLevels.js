export function getLevels(infoList) {
  let callNames = [];

  infoList.parentList.forEach(parentItem => {
    parentItem.callList?.forEach(callItem => {
      callNames.push(callItem.name);
    });
  });

  let lvlId = 0;
  let firstLevel = infoList.parentList.map(parent => {
    parent = new Map(Object.entries(parent));
    parent.delete('callList');
    return Object.fromEntries(parent);
  });

  callNames = [...[...new Set(callNames)].filter(Boolean)];
  infoList.levelsList = [firstLevel];
  let currentLevel = infoList.levelsList[0];

  while (true) {
    let secondLevel = [];
    currentLevel.forEach((item, i) => {
      if (callNames.includes(item.name)) {
        secondLevel.push(item);
        delete callNames[callNames.indexOf(item.name)];
        delete currentLevel[i];
      }
    });

    currentLevel = [...[...new Set(currentLevel)].filter(Boolean)];
    callNames = [...[...new Set(callNames)].filter(Boolean)];

    if (secondLevel.length) {
      infoList.levelsList.push(secondLevel);
      currentLevel = secondLevel;
      lvlId++;
    } else {
      currentLevel.forEach((item, i) => {
        if (item.role === 'variable') {
          secondLevel.push(item);
          delete currentLevel[i];
          currentLevel = [...[...new Set(currentLevel)].filter(Boolean)];
        }
      });
      infoList.levelsList.push(secondLevel);
      break;
    }
  }
  console.log('infoList', infoList);
  console.log('callNames', callNames);
}
