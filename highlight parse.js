'use strict';

const patterns = {
  regex: /\/.+\/\w*/g,
  comments: /\/\/.+/g,
  // oneLineMultiComments: /\/\*(.+)*\//g,
  openMultiComments: /\/\*.*/g,
  closeMultiComments: /.*\*\//g,
  oneLineMultiComments: /\/\*.*\*\//g,
  openBackQuotes: /`.+/g,
  closeBackQuotes: /.+`/g,
  oneLineBackQuotes: /`.+`/g,
  templateStrings: /(\${)(.+?)(})/g,
  strings: /'.*?'|".*?"/g,
  arguments: /\(([^(]+?)\).*?=>/g,
  keyWords:
    /\b(=>|break|case|class|catch|const|continue|debugger|default|delete|do|else|export|extends|finally|function|for|if|import|in|instanceof|let|new|return|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/g,
  keys: /\w+(?=:)/g,
  literals: /(null|true|false|undefined)\b/g,
  interfaces: /(window|document|console)\b/g,
  objects: /(?<=\.)(\w+)/g,
  numbers: /\b\d+?\b/g,
  words: /\b\w+?\b/g,
  symbols: /[^\w\s~]/g,
  spaces: /\s/g,
  funcNameAndArgs: /(?<=function)(\s+?)(\S+)(\s*?\(\s*?)(.*?)(\s*?\))/g,
  callFunctions: /\w+(?=\s*\()/g,
  allFuncNames: '',
};

let composeText;

let functionNames = [];

function addNameOfFunc(name) {
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

let isOpenComment = false;
let openBackQuotes = false;

function getHighlightText(rowText) {
  composeText = [];
  console.log('rowText: ', rowText);

  if (!rowText) {
    return `<br>`;
  }

  if (isOpenComment && !patterns.closeMultiComments.test(rowText)) {
    return `<span class="gray-string">${rowText}</span>`;
  }

  rowText = rowText.replace(patterns.oneLineMultiComments, (g0, index) => {
    g0 = g0.replace(/</gm, '&lt;');
    g0 = g0.replace(/>/gm, '&gt;');
    composeText[index] = `<span class="gray-string">${g0}</span>`;
    return '~'.repeat(g0.length);
  });

  rowText = rowText.replace(patterns.openMultiComments, (g0, index) => {
    g0 = g0.replace(/</gm, '&lt;');
    g0 = g0.replace(/>/gm, '&gt;');
    isOpenComment = true;
    composeText[index] = `<span class="gray-string">${g0}</span>`;
    return '~'.repeat(g0.length);
  });

  rowText = rowText.replace(patterns.closeMultiComments, (g0, index) => {
    isOpenComment = false;
    g0 = g0.replace(/</gm, '&lt;');
    g0 = g0.replace(/>/gm, '&gt;');
    composeText[index] = `<span class="gray-string">${g0}</span>`;
    return '~'.repeat(g0.length);
  });

  rowText = rowText.replace(patterns.comments, (g0, index) => {
    g0 = g0.replace(/</gm, '&lt;');
    g0 = g0.replace(/>/gm, '&gt;');
    composeText[index] = `<span class="gray-string">${g0}</span>`;
    return '~'.repeat(g0.length);
  });

  //==========================================================================================
  rowText = rowText.replace(patterns.oneLineBackQuotes, (g0, index) => {
    let subText = [];
    g0 = g0.replace(/</gm, '&lt;');
    g0 = g0.replace(/>/gm, '&gt;');
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

  //==========================================================================================
  rowText = rowText.replace(patterns.regex, (g0, index) => {
    g0 = g0.replace(/</gm, '&lt;');
    g0 = g0.replace(/>/gm, '&gt;');
    composeText[
      index
    ] = `<span class="block cyan-string cyan-shadow">${g0}</span>`;
    return '~'.repeat(g0.length);
  });

  rowText = rowText.replace(patterns.strings, (g0, index) => {
    g0 = g0.replace(/</gm, '&lt;');
    g0 = g0.replace(/>/gm, '&gt;');
    composeText[
      index
    ] = `<span class="block green-string green-shadow">${g0}</span>`;
    return '~'.repeat(g0.length);
  });

  // ______________________________________________________________Before

  rowText = rowText.replace(patterns.keys, (g0, index) => {
    composeText[index] = `<span class="orange-string">${g0}</span>`;
    return '~'.repeat(g0.length);
  });

  rowText = rowText.replace(patterns.arguments, (g0, g1, index) => {
    g1 = g1.replace(/\w+/gm, (subG0, subIndex) => {
      composeText[
        index + 1 + subIndex
      ] = `<span class="block strong-orange-string strong-orange-shadow">${subG0}</span>`;
      return '~'.repeat(subG0.length);
    });
    return `(${g1}) =>`;
  });

  rowText = rowText.replace(
    patterns.funcNameAndArgs,
    (g0, g1, g2, g3, g4, g5, index) => {
      addNameOfFunc(g2);
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

  rowText = rowText.replace(patterns.allFuncNames, (g0, g1, index) => {
    composeText[
      index
    ] = `<span class="block blue-string blue-shadow">${g1}</span>`;
    return '~'.repeat(g1.length);
  });

  rowText = rowText.replace(patterns.keyWords, (g0, g1, index) => {
    composeText[index] = `<span class="purple-string">${g1}</span>`;
    return '~'.repeat(g1.length);
  });

  rowText = rowText.replace(patterns.literals, (g0, g1, index) => {
    composeText[
      index
    ] = `<span class="block red-string red-shadow">${g1}</span>`;
    return '~'.repeat(g1.length);
  });

  rowText = rowText.replace(patterns.interfaces, (g0, g1, index) => {
    composeText[index] = `<span class="orange-string">${g1}</span>`;
    return '~'.repeat(g1.length);
  });

  rowText = rowText.replace(patterns.callFunctions, (g0, index) => {
    composeText[
      index
    ] = `<span class="block blue-string blue-shadow">${g0}</span>`;
    return '~'.repeat(g0.length);
  });

  rowText = rowText.replace(patterns.objects, (g0, g1, index) => {
    composeText[
      index
    ] = `<span class="block orange-string orange-shadow">${g1}</span>`;
    return '~'.repeat(g1.length);
  });

  rowText = rowText.replace(patterns.numbers, (g0, index) => {
    composeText[
      index
    ] = `<span class="block strong-orange-string strong-orange-shadow">${g0}</span>`;
    return '~'.repeat(g0.length);
  });

  // ______________________________________________________________After
  rowText.replace(patterns.words, (g0, index) => {
    composeText[
      index
    ] = `<span class="block white-string white-shadow">${g0}</span>`;
  });

  rowText.replace(patterns.symbols, (g0, index) => {
    composeText[index] = `<span class="cyan-string">${g0}</span>`;
  });

  rowText.replace(patterns.spaces, (g0, index) => {
    composeText[index] = `<span>${g0}</span>`;
  });

  return composeText.join('') + '\n';
}
