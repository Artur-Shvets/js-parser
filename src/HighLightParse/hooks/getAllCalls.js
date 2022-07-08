import { patterns, updateInfoList } from '../../hooks/index.js';

export function getAllCalls(text, composeText, mainParent) {
  text = text.replace(patterns.callFunctions, (g0, g1, index) => {
    let role = 'function';
    let id = updateInfoList({
      call: true,
      name: g1,
      role: role,
      mainParent,
    });
    // let idText = id && `id="${id}"`;
    composeText[
      index
    ] = `<span class="block blue-string blue-shadow call ${role} ${g1}">${g1}</span>`;

    return '~'.repeat(g1.length);
  });

  text = text.replace(patterns.callComponents, (g0, g1, index) => {
    let role = 'component';
    // debugger;
    let id = updateInfoList({
      call: true,
      name: g1,
      role: role,
      mainParent,
    });
    // let idText = id && `id="${id}"`;
    composeText[
      index
    ] = `<span class="block red-string red-shadow call ${role} ${g1}">${g1}</span>`;

    return '~'.repeat(g0.length);
  });

  text = text.replace(patterns.callVariables, (g0, index) => {
    let role = 'variable';
    let color = patterns.constants.test(g0) ? 'red' : 'white';
    let id = updateInfoList({
      call: true,
      name: g0,
      role: role,
      mainParent,
    });
    // let idText = id && `id="${id}"`;
    composeText[
      index
    ] = `<span class="block ${color}-string ${color}-shadow call ${role} ${g0}">${g0}</span>`;

    return '~'.repeat(g0.length);
  });

  return [text, composeText];
}
