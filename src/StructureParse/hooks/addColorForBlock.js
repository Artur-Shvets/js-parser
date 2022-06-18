export function addColorForBlock(block, rowText) {
  if (/\b(window|document|console)\./g.test(rowText)) {
    block.classList.add('orange-shadow');
  } else if (/\b(for|forEach)\b/g.test(rowText)) {
    block.classList.add('blue-shadow');
  } else if (/\b(var|const|while|let|function|if\b)/g.test(rowText)) {
    block.classList.add('purple-shadow');
  }

  return block;
}
