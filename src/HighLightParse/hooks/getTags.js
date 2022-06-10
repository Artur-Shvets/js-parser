import { patterns, getAngleBrackets } from './index.js';

export function getTags(text, composeText) {
  text = text.replace(patterns.tags, (g0, g1, g2, g3, index) => {
    let color = patterns.allTagsNames.test(g2) ? 'red' : 'orange';
    // g1 = getAngleBrackets(g1);
    // g3 = getAngleBrackets(g3);
    composeText[
      index + g1.length
    ] = `<span class="${color}-string">${g2}</span>`;

    return `${g1}${'~'.repeat(g2.length)}${g3}`;
  });

  return [text, composeText];
}
