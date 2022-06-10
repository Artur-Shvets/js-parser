import { patterns } from './index.js';

export function getAngleBrackets(text) {
  return text.replace(patterns.angleBrace, (g0, g1, g2) => {
    if (g1) {
      return '&lt;';
    } else if (g2) {
      return '&gt;';
    }
  });
}
