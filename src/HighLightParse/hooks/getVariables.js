import { patterns } from './index.js';

export function getVariables(text, composeText) {
  text = text.replace(patterns.variables, (g0, index) => {
    let color = patterns.constants.test(g0) ? 'red' : 'white';
    let isCall = patterns.callVariables.test(g0) ? 'call-var' : '';
    composeText[index] = `<span class="${color}-string ${isCall}">${g0}</span>`;
    return '~'.repeat(g0.length);
  });

  return [text, composeText];
}
