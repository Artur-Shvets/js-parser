export function getPreviousBlocks(mainParent, mainBlock, subBlock) {
  if (mainBlock.classList.contains('main-parent') != true) {
    subBlock = mainBlock.parentElement;
    mainBlock = subBlock.parentElement;
  } else {
    mainParent = false;
    mainBlock = false;
    subBlock = false;
  }

  return [mainParent, mainBlock, subBlock];
}
