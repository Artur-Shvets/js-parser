import { patterns } from './index.js';

export function getWords(text, composeText) {
  text.replace(patterns.words, (g0, index) => {
    composeText[
      index
    ] = `<span class="block white-string white-shadow">${g0}</span>`;
  });

  return [text, composeText];
}
