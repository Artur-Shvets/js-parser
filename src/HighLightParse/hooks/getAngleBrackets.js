import { patterns } from './index.js';

export function getAngleBrackets(text) {
  return text.replace(patterns.angleBrace, (g0, g1) => {
    return `&lt;${g1}&gt;`;
  });
}
