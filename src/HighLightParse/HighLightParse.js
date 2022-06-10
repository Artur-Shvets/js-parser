'use strict';

import {
  patterns,
  getRegex,
  getStrings,
  getOneLineMultiComments,
  getOpenMultiComments,
  getCloseMultiComments,
  getComments,
  getOneLineBackQuotes,
  getKeys,
  getArguments,
  getFuncNameAndArgs,
  getAllFuncNames,
  getKeyWords,
  getLiterals,
  getInterfaces,
  getCallFunctions,
  getObjects,
  getNumbers,
  getWords,
  getSymbols,
  getSpaces,
  getTags,
  getVariables,
  getConstants,
} from './hooks/index.js';

let composeText;
let functionNames = [];
let isOpenComment = false;

export function getHighLight(rowText) {
  composeText = [];

  if (!rowText) {
    return `<br>`;
  }
  // ____________________________Comments_____________________________________
  if (isOpenComment && !patterns.closeMultiComments.test(rowText)) {
    return `<span class="gray-string">${rowText}</span>`;
  }
  [rowText, composeText] = getOneLineMultiComments(rowText, composeText);

  if (!isOpenComment) {
    [rowText, composeText] = getOpenMultiComments(
      rowText,
      composeText,
      isOpenComment
    );
  }

  if (isOpenComment) {
    [rowText, composeText, isOpenComment] = getCloseMultiComments(
      rowText,
      composeText
    );
  }

  [rowText, composeText] = getOneLineBackQuotes(rowText, composeText);
  // ____________________________Comments_____________________________________

  [rowText, composeText] = getStrings(rowText, composeText);
  [rowText, composeText] = getComments(rowText, composeText);
  [rowText, composeText] = getRegex(rowText, composeText);
  [rowText, composeText] = getTags(rowText, composeText);

  // ______________________________________________________________Before
  [rowText, composeText] = getKeys(rowText, composeText);

  [rowText, composeText] = getVariables(rowText, composeText);

  [rowText, composeText] = getConstants(rowText, composeText);

  [rowText, composeText] = getArguments(rowText, composeText);

  [rowText, composeText] = getFuncNameAndArgs(
    rowText,
    composeText,
    functionNames
  );

  [rowText, composeText] = getAllFuncNames(rowText, composeText);

  [rowText, composeText] = getKeyWords(rowText, composeText);

  [rowText, composeText] = getLiterals(rowText, composeText);

  [rowText, composeText] = getInterfaces(rowText, composeText);

  [rowText, composeText] = getCallFunctions(rowText, composeText);

  [rowText, composeText] = getObjects(rowText, composeText);

  [rowText, composeText] = getNumbers(rowText, composeText);

  // ______________________________________________________________After

  [rowText, composeText] = getWords(rowText, composeText);

  [rowText, composeText] = getSymbols(rowText, composeText);

  [rowText, composeText] = getSpaces(rowText, composeText);

  return composeText.join('') + '\n';
}
