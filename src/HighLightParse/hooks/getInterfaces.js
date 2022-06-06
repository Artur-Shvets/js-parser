import { patterns } from './index.js';

export function getInterfaces(text, composeText) {
  text = text.replace(patterns.interfaces, (g0, g1, index) => {
    composeText[index] = `<span class="orange-string">${g1}</span>`;

    return '~'.repeat(g1.length);
  });

  return [text, composeText];
}
