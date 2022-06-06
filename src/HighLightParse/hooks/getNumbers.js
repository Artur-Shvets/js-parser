import { patterns } from './index.js';

export function getNumbers(text, composeText) {
  text = text.replace(patterns.numbers, (g0, index) => {
    composeText[
      index
    ] = `<span class="block strong-orange-string strong-orange-shadow">${g0}</span>`;

    return '~'.repeat(g0.length);
  });

  return [text, composeText];
}
