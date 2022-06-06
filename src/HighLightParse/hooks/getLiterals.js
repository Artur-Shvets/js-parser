import { patterns } from './index.js';

export function getLiterals(text, composeText) {
  text = text.replace(patterns.literals, (g0, g1, index) => {
    composeText[
      index
    ] = `<span class="block red-string red-shadow">${g1}</span>`;

    return '~'.repeat(g1.length);
  });

  return [text, composeText];
}
