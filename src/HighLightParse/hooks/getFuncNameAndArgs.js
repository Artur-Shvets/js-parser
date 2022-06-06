import { patterns, addNameOfFunc } from './index.js';

export function getFuncNameAndArgs(text, composeText, functionNames) {
  text = text.replace(
    patterns.funcNameAndArgs,
    (g0, g1, g2, g3, g4, g5, index) => {
      addNameOfFunc(g2, functionNames);
      composeText[
        index + g1.length
      ] = `<span class="block blue-string blue-shadow">${g2}</span>`;

      g4 = g4.replace(/\w+/gm, (subg0, subindex) => {
        composeText[
          index + g1.length + g2.length + g3.length + subindex
        ] = `<span class="block strong-orange-string strong-orange-shadow">${subg0}</span>`;

        return '~'.repeat(subg0.length);
      });

      return g1 + '~'.repeat(g2.length) + g3 + g4 + g5;
    }
  );

  return [text, composeText];
}
