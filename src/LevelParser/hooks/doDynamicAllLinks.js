import { svgSpace } from '../../hooks/index.js';

export function doDynamicAllLinks() {
  svgSpace.childNodes.forEach(svg => {
    let [Id1, Id2] = svg.id.split('.');
    let vertex1 = document.getElementById(Id1);
    let link = svg;
    let vertex2 = document.getElementById(Id2);
    let path = svg.children[0];
    if (vertex1 && vertex2) {
      let x1 = vertex1.getBoundingClientRect().x + window.scrollX;
      let y1 = vertex1.getBoundingClientRect().y + window.scrollY;
      let x2 = vertex2.getBoundingClientRect().x + window.scrollX;
      let y2 = vertex2.getBoundingClientRect().y + window.scrollY;
      vertex2.style.left = x2 + 'px';
      vertex2.style.top = y2 + 'px';
      link.style.left = Math.min(x1, x2) + 4 + 'px';
      link.style.top = Math.min(y1, y2) + 4 + 'px';
      link.setAttribute('width', Math.abs(x1 - x2) + 2 + 'px');
      link.setAttribute('height', Math.abs(y1 - y2) + 2 + 'px');
      let centerWidth = Math.abs(x1 - x2) / 2;
      let height = Math.abs(y1 - y2) + 1;
      let width = Math.abs(x1 - x2) + 1;
      if ((x2 < x1) & (y2 < y1) || (x2 > x1) & (y2 > y1)) {
        path.setAttribute(
          'd',
          `M  0 1 C ${centerWidth} 1, ${centerWidth} ${height} ${width} ${height}`
        );
      } else {
        path.setAttribute(
          'd',
          `M  0 ${height} C ${centerWidth} ${height}, ${centerWidth} 1 ${width} 1`
        );
      }
    }
  });
}
