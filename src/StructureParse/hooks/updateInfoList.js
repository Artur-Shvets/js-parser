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
    id: id,
    declaration: declaration,
    call: call,
    role: role,
    name: name,
  };

  if (multiLine) {
    role === 'function'
      ? infoList.declarationList.functionNames.push(name)
      : infoList.declarationList.variableNames.push(name);
    result = id;
  }

  let isIncludes = [...functionNames, ...variableNames].includes(name);

  if (isNewParent && isIncludes) {
    if (declaration) {
      infoList.parentList.push(newBlock);
      result = id;
    }
  } else if (call && isIncludes) {
    let index = infoList.parentList.length && infoList.parentList.length - 1;
    let lastParent = { ...infoList.parentList[index] };
    lastParent.callList
      ? lastParent.callList.push(newBlock)
      : (lastParent.callList = [newBlock]);
    infoList.parentList[index] = lastParent;
    result = id;
  }

  return result;
}
