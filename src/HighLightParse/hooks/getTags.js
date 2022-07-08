import { patterns, updateInfoList } from '../../hooks/index.js';

export function getTags(text, composeText, mainParent) {
  text = text.replace(patterns.tags, (g0, g1, g2, g3, index) => {
    let id = updateInfoList({
      call: true,
      name: g2,
      role: 'component',
      mainParent,
    });
    let className = id ? 'orange-string ' + g2 : 'red-string';
    let idText = id && `id="${id}"`;
    composeText[
      index + g1.length
    ] = `<span ${idText} class="${className}">${g2}</span>`;

    return `${g1}${'~'.repeat(g2.length)}${g3}`;
  });

  return [text, composeText];
}
