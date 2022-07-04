export function createVertex(block, order, type) {
  if (order == 1) {
    let vertex1 = document.createElement('span');
    vertex1.classList.add('vertex', 'v1', type);
    block?.prepend(vertex1);
    return vertex1;
  }
  if (order == 2) {
    let vertex2 = document.createElement('span');
    vertex2.classList.add('vertex', 'v2', type);
    block?.append(vertex2);
    return vertex2;
  }
}
