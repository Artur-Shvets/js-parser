import { patterns, getAngleBrackets } from './index.js';

export function getOpenCloseMultiStrings(text, composeText, isOpen) {
  let pattern = isOpen ? patterns.closeBackQuotes : patterns.openBackQuotes;
  text = text.replace(pattern, (g0, index) => {
    g0 = getAngleBrackets(g0);
    composeText[
      index
    ] = `<span class="block green-string green-shadow">${g0}</span>`;
    return '~'.repeat(g0.length);
  });

  return [text, composeText, !isOpen];
}
