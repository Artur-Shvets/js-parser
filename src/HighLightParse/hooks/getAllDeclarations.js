import { patterns, updateInfoList } from '../../hooks/index.js';

const modification = '^(\\w.*?|)';
const arrowFuncNames = new RegExp(modification + patterns.arrowFuncNames, 'gm');
const funcNames = new RegExp(modification + patterns.funcNames, 'gm');
const varNames = new RegExp(modification + patterns.varNames, 'gm');

export function getAllDeclarations(fullText) {
  fullText = fullText.replace(arrowFuncNames, (g0, g1, g2, g3, g4) => {
    updateInfoList({
      declaration: true,
      name: g4,
      role: 'function',
      multiLine: true,
    });
    return '~'.repeat(g0.length);
  });

  fullText = fullText.replace(funcNames, (g0, g1, g2, g3, g4) => {
    updateInfoList({
      declaration: true,
      name: g4,
      role: 'function',
      multiLine: true,
    });
    return '~'.repeat(g0.length);
  });

  fullText = fullText.replace(varNames, (g0, g1, g2, g3, g4) => {
    updateInfoList({
      declaration: true,
      name: g4,
      role: 'variable',
      multiLine: true,
    });
    return '~'.repeat(g0.length);
  });
}

export function getDeclarations(text, composeText, mainParent) {
  text = text.replace(
    new RegExp(patterns.arrowFuncNames, ''),
    (g0, g1, g2, g3, index) => {
      g3 &&
        updateInfoList({
          declaration: true,
          name: g3,
          role: 'function',
          mainParent,
        });
      composeText[
        index
      ] = `<span class="purple-string">${g1}</span><span>${g2}</span><span class="block blue-string blue-shadow dec-func ${g3}">${g3}</span>`;
      return '~'.repeat(g0.length);
    }
  );

  let pattern = new RegExp(patterns.funcNames, '');
  text = text.replace(pattern, (g0, g1, g2, g3, index) => {
    g3 &&
      updateInfoList({
        declaration: true,
        name: g3,
        role: 'function',
        mainParent,
      });
    composeText[
      index
    ] = `<span class="purple-string">${g1}</span><span>${g2}</span><span class="block blue-string blue-shadow dec-func ${g3}">${g3}</span>`;
    return '~'.repeat(g0.length);
  });

  text = text.replace(
    new RegExp(patterns.varNames, ''),
    (g0, g1, g2, g3, index) => {
      let color = patterns.constants.test(g3) ? 'red' : 'white';
      g3 &&
        updateInfoList({
          declaration: true,
          name: g3,
          role: 'variable',
          mainParent,
        });
      composeText[
        index
      ] = `<span class="purple-string">${g1}</span><span>${g2}</span><span class="block ${color}-string ${color}-shadow dec-var ${g3}">${g3}</span>`;
      return '~'.repeat(g0.length);
    }
  );

  return [text, composeText];
}
