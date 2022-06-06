import { patterns } from './index.js';

export function getSymbols(text, composeText) {
  text.replace(patterns.symbols, (g0, index) => {
    composeText[index] = `<span class="cyan-string">${g0}</span>`;
  });

  return [text, composeText];
}
