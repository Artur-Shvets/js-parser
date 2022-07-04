import {
  patterns,
  getOneLineMultiComments,
  getOpenMultiComments,
  getCloseMultiComments,
  getOpenCloseMultiStrings,
  getOneLineBackQuotes,
  getStrings,
  getComments,
  getRegex,
} from './index.js';

let isOpenComment = false;
let isOpenString = false;

export function getAllComments(rowText, composeText) {
  //  _____________________________ COMMENTS ______________________________
  if (isOpenComment && !patterns.closeMultiComments.test(rowText)) {
    rowText = rowText.replace(/.+/, (g0, index) => {
      composeText[index] = `<span class="gray-string">${g0}</span>`;
      return '~'.repeat(g0.length);
    });
  }

  [rowText, composeText] = getOneLineMultiComments(rowText, composeText);

  if (!isOpenComment && patterns.openMultiComments.test(rowText)) {
    [rowText, composeText, isOpenComment] = getOpenMultiComments(
      rowText,
      composeText
    );
  }

  if (isOpenComment && patterns.closeMultiComments.test(rowText)) {
    [rowText, composeText, isOpenComment] = getCloseMultiComments(
      rowText,
      composeText
    );
  }

  //  _____________________________ STRINGS ______________________________
  if (isOpenString && !patterns.closeBackQuotes.test(rowText)) {
    rowText = rowText.replace(/.+/, (g0, index) => {
      composeText[
        index
      ] = `<span class="block green-string green-shadow">${g0}</span>`;
      return '~'.repeat(g0.length);
    });
  }

  [rowText, composeText] = getOneLineBackQuotes(rowText, composeText);

  if (
    (isOpenString && patterns.closeBackQuotes.test(rowText)) ||
    (!isOpenString && patterns.openBackQuotes.test(rowText))
  ) {
    [rowText, composeText, isOpenString] = getOpenCloseMultiStrings(
      rowText,
      composeText,
      isOpenString
    );
  }

  [rowText, composeText] = getStrings(rowText, composeText);
  [rowText, composeText] = getComments(rowText, composeText);

  return [rowText, composeText];
}
