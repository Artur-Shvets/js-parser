import { patterns } from './index.js';

export function getAllFuncNames(text, composeText) {
  text = text.replace(patterns.allFuncNames, (g0, g1, index) => {
    composeText[
      index
    ] = `<span class="block blue-string blue-shadow">${g1}</span>`;

    return '~'.repeat(g1.length);
  });

  return [text, composeText];
}
