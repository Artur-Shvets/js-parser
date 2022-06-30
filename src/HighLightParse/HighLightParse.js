import {
  getKeys,
  getArguments,
  getKeyWords,
  getLiterals,
  getInterfaces,
  getDeclarations,
  getAllCalls,
  getObjects,
  getNumbers,
  getWords,
  getSymbols,
  getSpaces,
  getTags,
  getConstants,
  getAllComments,
} from './hooks/index.js';
let composeText = [];

// ______________________________________________________________HIGHLIGHT () => {}
export function getHighLight(
  rowText,
  isNewParent = false,
  needCheckComments = false
) {
  if (!rowText) {
    return '<br>';
  }

  if (needCheckComments) {
    composeText = [];
    [rowText, composeText] = getAllComments(rowText, composeText);
    return rowText;
  }

  [rowText, composeText] = getTags(rowText, composeText, isNewParent);

  // ______________________________________________________________Before
  [rowText, composeText] = getKeyWords(rowText, composeText);

  [rowText, composeText] = getDeclarations(rowText, composeText, isNewParent);

  [rowText, composeText] = getAllCalls(rowText, composeText, isNewParent);

  [rowText, composeText] = getKeys(rowText, composeText);

  [rowText, composeText] = getConstants(rowText, composeText);

  [rowText, composeText] = getArguments(rowText, composeText);

  [rowText, composeText] = getLiterals(rowText, composeText);

  [rowText, composeText] = getInterfaces(rowText, composeText);

  [rowText, composeText] = getObjects(rowText, composeText);

  [rowText, composeText] = getNumbers(rowText, composeText);
  // ______________________________________________________________After
  [rowText, composeText] = getWords(rowText, composeText);

  [rowText, composeText] = getSymbols(rowText, composeText);

  [rowText, composeText] = getSpaces(rowText, composeText);

  return composeText.join('') + '\n';
}
