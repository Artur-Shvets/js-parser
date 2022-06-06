import { patterns } from './index.js';

export function getAngleBrackets(text) {
  return text.replace(patterns.angleBrackets, (g0, g1) => {
    return `&lt;${g1}&gt;`;
  });
}
