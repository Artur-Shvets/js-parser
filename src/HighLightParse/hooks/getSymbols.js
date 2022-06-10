import { patterns, getAngleBrackets } from './index.js';

export function getSymbols(text, composeText) {
  text.replace(patterns.symbols, (g0, index) => {
    g0 = getAngleBrackets(g0);
    composeText[index] = `<span class="cyan-string">${g0}</span>`;
    return '~'.repeat(g0.length);
  });

  return [text, composeText];
}
