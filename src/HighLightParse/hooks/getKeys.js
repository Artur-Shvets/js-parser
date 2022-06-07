import { patterns } from './index.js';

export function getKeys(text, composeText) {
  text = text.replace(patterns.keys, (g0, index) => {
    composeText[index] = `<span class="orange-string">${g0}</span>`;
    return '~'.repeat(g0.length);
  });

  return [text, composeText];
}
