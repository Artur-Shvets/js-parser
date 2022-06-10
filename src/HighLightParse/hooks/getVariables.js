import { patterns } from './index.js';

export function getVariables(text, composeText) {
  text = text.replace(patterns.variables, (g0, index) => {
    let color = patterns.constants.test(g0) ? 'red' : 'white';
    composeText[index] = `<span class="${color}-string">${g0}</span>`;
    return '~'.repeat(g0.length);
  });

  return [text, composeText];
}
