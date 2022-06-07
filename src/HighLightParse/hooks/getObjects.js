import { patterns } from './index.js';

export function getObjects(text, composeText) {
  text = text.replace(patterns.objects, (g0, g1, index) => {
    composeText[
      index
    ] = `<span class="block orange-string orange-shadow">${g1}</span>`;

    return '~'.repeat(g1.length);
  });

  return [text, composeText];
}
