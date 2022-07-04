import { svgSpace } from '../../hooks/index.js';

export function createLink(type) {
  let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.cssText = 'position:absolute';
  svgSpace.append(svg);
  let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke-width', 2);
  if (type == 'function') {
    path.setAttribute('stroke', '#C792EA');
  } else {
    path.setAttribute('stroke', 'rgba(255, 255, 255, 0.2)');
  }
  path.setAttribute('fill', 'transparent');
  svg.append(path);
  return svg;
}
