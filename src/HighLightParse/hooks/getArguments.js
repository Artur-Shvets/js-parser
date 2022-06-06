import { patterns } from './index.js';

export function getArguments(text, composeText) {
  text = text.replace(patterns.arguments, (g0, g1, index) => {
    g1 = g1.replace(/\w+/gm, (subG0, subIndex) => {
      composeText[
        index + 1 + subIndex
      ] = `<span class="block strong-orange-string strong-orange-shadow">${subG0}</span>`;

      return '~'.repeat(subG0.length);
    });

    return `(${g1}) =>`;
  });

  return [text, composeText];
}
