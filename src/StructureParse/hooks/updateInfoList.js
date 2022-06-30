export let infoList = {
  declarationList: {
    functionNames: [],
    variableNames: [],
  },
  parentList: [],
};

export function updateInfoList({
  declaration = false,
  call = false,
  name = false,
  role = false,
  multiLine = false,
  isNewParent = false,
}) {
  let { functionNames, variableNames } = infoList.declarationList;
  let result = '';

  let id = 'id' + Math.random().toString(16).slice(7);

  let newBlock = {
    id,
    declaration,
    call,
    role,
    name,
  };

  if (multiLine) {
    role === 'function'
      ? infoList.declarationList.functionNames.push(name)
      : infoList.declarationList.variableNames.push(name);
    result = id;
  } else if (
    role === 'function'
      ? functionNames.includes(name)
      : variableNames.includes(name)
  ) {
    if (isNewParent && declaration) {
      infoList.parentList.push({ ...newBlock, callList: [] });
      result = id;
    } else {
      let index = infoList.parentList.length && infoList.parentList.length - 1;
      infoList.parentList[index].callList.push(newBlock);
      result = id;
    }
  }

  return result;
}
