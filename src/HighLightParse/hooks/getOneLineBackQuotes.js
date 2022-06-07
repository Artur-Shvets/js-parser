import { patterns, getAngleBrackets } from './index.js';

export function getOneLineBackQuotes(text, composeText) {
  text = text.replace(patterns.oneLineBackQuotes, (g0, index) => {
    let subText = [];
    g0 = getAngleBrackets(g0);

    g0 = g0.replace(
      patterns.templateStrings,
      (subG0, subG1, subG2, subG3, subIndex) => {
        subText[
          subIndex
        ] = `<span class="cyan-string">${subG1}</span><span class="block green-string green-shadow">${subG2}</span><span class="cyan-string">${subG3}</span>`;
        return '~'.repeat(subG0.length);
      }
    );

    g0.replace(/[^~]+/gm, (subG0, subIndex) => {
      subText[subIndex] = subG0;
      return '~'.repeat(subG0.length);
    });

    subText = subText.join('');
    composeText[index + 1] =
      '<span class="block green-string green-shadow">' + subText + '</span>';
    return '~'.repeat(g0.length);
  });

  return [text, composeText];
}
