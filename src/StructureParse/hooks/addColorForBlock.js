export function addColorForBlock(block, rowText) {
  if (block.classList.contains('row-block')) {
    if (/\b(let|function|if)\b/g.test(rowText)) {
      block.classList.add('purple-shadow');
    }
  } else {
    if (/\b(let|function|if)\b/g.test(rowText)) {
      block.classList.add('purple-shadow');
    } else if (/\b(for|forEach)\b/g.test(rowText)) {
      block.classList.add('blue-shadow');
    } else if (/(window|document|console)\./g.test(rowText)) {
      block.classList.add('orange-shadow');
    }
  }

  return block;
}
