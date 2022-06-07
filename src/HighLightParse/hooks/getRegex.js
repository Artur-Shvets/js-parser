import { patterns, getAngleBrackets } from './index.js';

export function getRegex(text, composeText) {
  text = text.replace(patterns.regex, (g0, index) => {
    g0 = getAngleBrackets(g0);

    composeText[
      index
    ] = `<span class="block cyan-string cyan-shadow">${g0}</span>`;

    return '~'.repeat(g0.length);
  });

  return [text, composeText];
}
