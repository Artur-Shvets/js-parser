export let infoList = {
  declarationList: {
    functionNames: [],
    componentNames: [],
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
  mainParent = false,
}) {
  let { functionNames, variableNames, componentNames } =
    infoList.declarationList;

  let id = 'id' + Math.random().toString(16).slice(7);

  let newBlock = {
    id,
    declaration,
    call,
    role,
    name,
  };

  if (multiLine) {
    role === 'function' && infoList.declarationList.functionNames.push(name);
    role === 'component' && infoList.declarationList.componentNames.push(name);
    role === 'variable' && infoList.declarationList.variableNames.push(name);
  } else if (
    (role === 'function' && functionNames.includes(name)) ||
    (role === 'component' && componentNames.includes(name)) ||
    (role === 'variable' && variableNames.includes(name))
  ) {
    if (mainParent && declaration) {
      infoList.parentList.push({ ...newBlock, callList: [] });
      mainParent.id = id;
      return id;
    } else {
      let index = infoList.parentList.length && infoList.parentList.length - 1;
      // index &&
      infoList.parentList[index].name === name
        ? (infoList.parentList[index].callList = [])
        : infoList.parentList[index].callList.push(newBlock);
      return '';
    }
  }
}
