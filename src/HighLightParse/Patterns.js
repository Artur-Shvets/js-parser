export const patterns = {
  // _______________________________________________ BRACKETS
  regex: /\/.+\/\w*/g,
  // openAngle: /(^\s*?>|<[^<\/]*?[^\/]>|<\w*?)\s*?(\/\/|\/\*|$)/,
  openAngle: /^\s*(>|<[^\/=<>].*?[^\/=<\w>]>|<\w*>)/,
  // closedAngle: /^\s*?(<\/.*?>|\/?>)/,
  closedAngle: /^\s*(.*<\/.*?>)/,
  angleBrace: /(<)|(>)/g,
  openBrackets: /(\{|\[|\()\s*(\/\/|$)/,
  closedBrackets: /^\s*?(\}|\]|\))/,
  tags: /(<\/?\s*?)([a-z|0-9]*)(>?)/g,
  // _______________________________________________ COMMENTS
  comments: /\/\/.+/,
  openMultiComments: /\/\*.*/,
  closeMultiComments: /.*\*\//,
  oneLineMultiComments: /\/\*.*\*\//g,
  // _______________________________________________ STRINGS
  openBackQuotes: /`.*/,
  closeBackQuotes: /.*`/,
  oneLineBackQuotes: /`.+`/g,
  templateStrings: /(\${)(.+?)(})/g,
  strings: /'.*?'|".*?"/g,
  // ============================================ <<<< Before >>>>
  keyWords:
    /\b(=>|break|case|class|catch|continue|debugger|default|delete|do|else|export|extends|finally|for|forEach|from|if|import|in|instanceof|new|return|super|switch|this|throw|try|type|typeof|void|while|with|yield)\b/g,
  // ____________________________________________ ALL DECLARATION
  arrowFuncNames: '(const|let|var)(\\s+)(\\w+)(?=.*=\\s*?\\()',
  funcNames: '(function)(\\s+)(\\w+)(?=.*\\s*?\\()',
  varNames: '(const|let|var)(\\s+)(\\w+)',
  componentsNames: /\b[A-Z]\w*[a-z]\w*/,
  // ________________________________________________ ALL CALLS
  callFunctions: /(\w+?)(?=\s*?\()/g,
  // callComponents: /(?<!\.)\b\w+(?=\s*?=)/,
  callComponents: /(?<=<)([A-Z]\w*)/,
  // callComponents: /(?<=<)\w+/g,
  callVariables: /(?<!\.)\b\w+/g,
  keys: /\w+(?=:)/g,
  constants: /(?<!>)\b[A-Z_?]+\b(?!<)/,
  arguments: /\(([^(]+?)\).*?=>/,
  literals: /(null|true|false|undefined)\b/g,
  interfaces: /(window|document|console)\b/g,
  objects: /(?<=\w\.)(\w+)/g,
  numbers: /\b\d+?\b/g,
  // ============================================== <<<< After >>>>
  words: /\b\w+?\b/g,
  symbols: /[^\w\s~]+/g,
  spaces: /\s+/g,

  allTagsNames:
    /\b(a|u|ul|abbr|div|script|section|select|small|source|span|table|tbody|td|textarea|th|thead|title|tr|body|br|button|canvas|label|legend|li|link|main|acronym|address|h1|h2|h3|h4|h5|h6|head|header|hr|html|font|footer|form|frame|i|iframe|img|input|applet|area|article|aside|audio|b|base|basefont|bdi|bdo|big|blockquote|caption|center|cite|code|col|colgroup|data|datalist|dd|del|details|dfn|dialog|dir|dl|dt|em|embed|fieldset|figcaption|figure|frameset|ins|kbd|map|mark|menu|menuitem|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|picture|pre|progress|q|rp|rt|ruby|s|samp|strike|strong|style|sub|summary|sup|tfoot|time|track|tt|var|video|wbr)\b/,
};
