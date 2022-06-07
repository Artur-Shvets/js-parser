import { patterns, getAngleBrackets } from './index.js';

export function getTags(text, composeText) {
  text = text.replace(patterns.tags, (g0, g1, g2, g3, index) => {
    composeText[index + g1.length] = `<span class="${
      patterns.allTagsNames.test(g2) ? 'red' : 'orange'
    }-string">${g2}</span>`;

    return `${g1}${'~'.repeat(g2.length)}${g3}`;
  });

  return [text, composeText];
}
