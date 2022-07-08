import { createVertex, createLink } from '../../hooks/index.js';

export function createAllLinks(parentList) {
  parentList.forEach(parent => {
    if (parent.callList?.length) {
      let v1Id = 'v1' + parent.id.slice(2);
      let parentBlock = document.getElementById(parent.id);
      let parentRowBlock = parentBlock.firstChild;
      if (!parentRowBlock.firstChild.classList.contains('v1')) {
        let vertex1 = createVertex(parentRowBlock, 1, parent.role);
        vertex1.id = v1Id;
      }

      parent.callList.forEach(callItem => {
        let callParent = parentList.find(item => item.name === callItem.name);
        let v2Id = 'v2' + callParent?.id.slice(2);

        let callParentBlock = document.getElementById(callParent?.id);
        let callRowBlock = callParentBlock?.firstChild;
        let svg = createLink(callItem.role);

        if (!callRowBlock?.lastChild.classList.contains('v2')) {
          let vertex2 = createVertex(callRowBlock, 2, callParent.role);
          vertex2.id = v2Id;
        }

        svg.id = v1Id + '.' + v2Id;
      });
    }
  });
}
