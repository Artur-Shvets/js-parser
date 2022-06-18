import { patterns, updateInfoList, getAngleBrackets } from './index.js';

export function getTags(text, composeText) {
  text = text.replace(patterns.tags, (g0, g1, g2, g3, index) => {
    let id = updateInfoList({
      call: true,
      name: g2,
      role: 'react-component',
    });
    let className = id ? 'orange-string call-comp ' + g2 : 'red-string';
    id = id && `id="${id}"`;
    composeText[
      index + g1.length
    ] = `<span ${id} class="${className}">${g2}</span>`;

    return `${g1}${'~'.repeat(g2.length)}${g3}`;
  });

  return [text, composeText];
}
