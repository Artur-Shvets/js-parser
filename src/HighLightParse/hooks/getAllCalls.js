import { patterns, updateInfoList } from './index.js';

export function getAllCalls(text, composeText, isNewParent) {
  text = text.replace(patterns.callFunctions, (g0, g1, index) => {
    let id = g1
      ? `id="${updateInfoList({
          call: true,
          name: g1,
          role: 'function',
          isNewParent,
        })}"`
      : '';
    composeText[
      index
    ] = `<span ${id} class="block blue-string blue-shadow call-func ${g1}">${g1}</span>`;

    return '~'.repeat(g1.length);
  });

  text = text.replace(patterns.callVariables, (g0, index) => {
    let color = patterns.constants.test(g0) ? 'red' : 'white';
    let id = g0
      ? `id="${updateInfoList({
          call: true,
          name: g0,
          role: 'variable',
          isNewParent,
        })}"`
      : '';
    composeText[
      index
    ] = `<span ${id} class="block ${color}-string ${color}-shadow call-func ${g0}">${g0}</span>`;

    return '~'.repeat(g0.length);
  });

  return [text, composeText];
}
