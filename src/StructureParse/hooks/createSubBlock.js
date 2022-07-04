export function createSubBlock(subBlock, mainBlock) {
  subBlock = document.createElement('div');
  subBlock.classList.add('sub-block');
  mainBlock.append(subBlock);

  return subBlock;
}
