"use strict"

const patterns = {
  regex: /\/.+\/\w*/gm,
  comments: /\/\/.+/gm,
  backQuotes: /`(.*?)\${(.*?)}(.*?)`/gm,
  strings: /(["'])(.+?)\1/gm,
  arguments: /\(([^(]+?)\).*?=>/gm,
  keyWords: /(=>|break|case|class|catch|const|continue|debugger|default|delete|do|else|export|extends|finally|function|if|import|in|instanceof|let|new|return|super|switch|this|throw|try|typeof|var|void|while|with|yield)\s/gm,
  literals: /(null|true|false)/gm,
  interfaces: /(window|document|console)\./gm,
  objects: /(?<=\.)(\w+)/gm,
  numbers: /\b\d+?\b/gm,
  words: /\b\w+?\b/gm,
  symbols: /[^\w\s~]/gm,
  spaces: /\s/gm,
  funcNameAndArgs: /(?<=function)(\s*?)(\w+)(\s*?\(\s*?)(.*?)(\s*?\))/gm,
  allFuncNames: ''
}

let composeText;

let functionNames = [];

function addNameOfFunc (name) {
  functionNames.push(name);
  if (patterns.allFuncNames) {
    patterns.allFuncNames = new RegExp('('+functionNames.join('|')+')', 'gm');
  } else {
    patterns.allFuncNames = new RegExp('('+name+')', 'gm');
  }
}

function getHighlightText (rowText) {
  composeText = [];
  rowText = rowText.replace(patterns.regex, (g0, index) => {
    composeText[index] = `<span class="cyan-string">${g0}</span>`;
    return '~'.repeat(g0.length)
  });
  rowText = rowText.replace(patterns.comments, (g0, index) => {
    composeText[index] = `<span class="block gray-string gray-shadow">${g0}</span>`;
    return '~'.repeat(g0.length)
  });
  rowText = rowText.replace(patterns.backQuotes, (g0, g1, g2, g3, index) => {
    composeText[index] = `<span class="green-string">`;
    return '~'.repeat(g0.length)
  });
  rowText = rowText.replace(patterns.strings, (g0, g1, g2, index) => {
    composeText[index+1] = `<span class="block green-string green-shadow">${g2}</span>`;
    return g1+('~'.repeat(g2.length))+g1
  });
  rowText = rowText.replace(patterns.arguments, (g0, g1, index) => {
    g1 = g1.replace(/\w+/gm, (subg0, subindex) => {
      composeText[index+1+subindex] = `<span class="block strong-orange-string strong-orange-shadow">${subg0}</span>`;
      return '~'.repeat(subg0.length)
    })
    return `(${g1}) =>`
  });
  rowText = rowText.replace(patterns.funcNameAndArgs, (g0, g1, g2, g3, g4, g5, index) => {
    addNameOfFunc(g2);
    composeText[index+g1.length] = `<span class="block blue-string blue-shadow">${g2}</span>`;
    g4 = g4.replace(/\w+/gm, (subg0, subindex) => {
      composeText[index+g1.length+g2.length+g3.length+subindex] = `<span class="block strong-orange-string strong-orange-shadow">${subg0}</span>`;
      return '~'.repeat(subg0.length)
    })
    return g1+'~'.repeat(g2.length)+g3+g4+g5
  });
  rowText = rowText.replace(patterns.allFuncNames, (g0, g1, index) => {
    composeText[index] = `<span class="block blue-string blue-shadow">${g1}</span>`;
    return '~'.repeat(g1.length)
  });
  rowText = rowText.replace(patterns.keyWords, (g0, g1, index) => {
    composeText[index] = `<span class="purple-string">${g1}</span>`;
    return '~'.repeat(g1.length)+' '
  });
  rowText = rowText.replace(patterns.literals, (g0, g1, index) => {
    composeText[index] = `<span class="block red-string red-shadow">${g1}</span>`;
    return '~'.repeat(g1.length)
  });
  rowText = rowText.replace(patterns.interfaces, (g0, g1, index) => {
    composeText[index] = `<span class="orange-string">${g1}</span>`;
    return '~'.repeat(g1.length)+'.'
  });
  rowText = rowText.replace(patterns.objects, (g0, g1, index) => {
    if (g1 == 'length') {
      composeText[index] = `<span class="block ash-string ash-shadow">${g1}</span>`;
    } else {
      composeText[index] = `<span class="block blue-string blue-shadow">${g1}</span>`;
    }
    return '~'.repeat(g1.length)
  });
  rowText = rowText.replace(patterns.numbers, (g0, index) => {
    composeText[index] = `<span class="block strong-orange-string strong-orange-shadow">${g0}</span>`;
    return '~'.repeat(g0.length)
  });
  rowText.replace(patterns.words, (g0, index) => {
    composeText[index] = `<span class="block ash-string ash-shadow">${g0}</span>`;
  });
  rowText.replace(patterns.symbols, (g0, index) => {
    composeText[index] = `<span class="cyan-string">${g0}</span>`;
  });
  rowText.replace(patterns.spaces, (g0, index) => {
    composeText[index] = `<span>${g0}</span>`;
  });
  return composeText.join('');
}
