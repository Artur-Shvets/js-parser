import { patterns } from './index.js';

export function getKeyWords(text, composeText) {
  text = text.replace(patterns.keyWords, (g0, g1, index) => {
    composeText[index] = `<span class="purple-string">${g1}</span>`;

    return '~'.repeat(g1.length);
  });

  return [text, composeText];
}
