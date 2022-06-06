import { patterns, getAngleBrackets } from './index.js';

export function getOpenMultiComments(text, composeText) {
  text = text.replace(patterns.openMultiComments, (g0, index) => {
    g0 = getAngleBrackets(g0);
    composeText[index] = `<span class="gray-string">${g0}</span>`;

    return '~'.repeat(g0.length);
  });

  return [text, composeText, true];
}
