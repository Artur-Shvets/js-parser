import { patterns } from './index.js';

export function getConstants(text, composeText) {
  text = text.replace(patterns.constants, (g0, index) => {
    composeText[index] = `<span class="red-string">${g0}</span>`;

    return '~'.repeat(g0.length);
  });

  return [text, composeText];
}
