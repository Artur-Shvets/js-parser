import { patterns } from './index.js';

export function getCallFunctions(text, composeText) {
  text = text.replace(patterns.callFunctions, (g0, index) => {
    composeText[
      index
    ] = `<span class="block blue-string blue-shadow">${g0}</span>`;

    return '~'.repeat(g0.length);
  });

  return [text, composeText];
}
