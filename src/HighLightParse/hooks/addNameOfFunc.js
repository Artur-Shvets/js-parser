import { patterns } from './index.js';

export function addNameOfFunc(name, functionNames) {
  functionNames.push(name);
  if (patterns.allFuncNames) {
    patterns.allFuncNames = new RegExp(
      '(' + functionNames.join('|') + ')',
      'gm'
    );
  } else {
    patterns.allFuncNames = new RegExp('(' + name + ')', 'gm');
  }
}
