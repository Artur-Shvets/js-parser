import {
  patterns,
  getOneLineMultiComments,
  getOpenMultiComments,
  getCloseMultiComments,
  getOneLineBackQuotes,
  getStrings,
  getComments,
  getRegex,
} from './index.js';

let isOpenComment = false;

export function getAllComments(rowText, composeText) {
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
  [rowText, composeText] = getStrings(rowText, composeText);
  [rowText, composeText] = getComments(rowText, composeText);
  [rowText, composeText] = getRegex(rowText, composeText);

  return [rowText, composeText];
}
