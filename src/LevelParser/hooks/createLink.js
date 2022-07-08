import { svgSpace } from '../../hooks/index.js';

export function createLink(type) {
  let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.cssText = 'position:absolute';
  svgSpace.append(svg);
  let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke-width', 8);
  switch (type) {
    case 'function':
      path.setAttribute('stroke', 'rgba(199, 146, 234, 0.1)');
      break;
    case 'component':
      path.setAttribute('stroke', 'rgba(255, 203, 107, 0.1)');
      break;
    case 'variable':
      path.setAttribute('stroke', 'rgba(255, 255, 255, 0.1)');
      break;
    default:
  }
  path.setAttribute('fill', 'transparent');
  svg.append(path);
  return svg;
}
