import { patterns } from './index.js';

export function getSpaces(text, composeText) {
  text.replace(patterns.spaces, (g0, index) => {
    composeText[index] = `<span>${g0}</span>`;
  });

  return [text, composeText];
}
