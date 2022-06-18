export function getLevels(input) {
  let levels = [];
  let mainBlock = [];

  input.querySelectorAll('.main-parent').forEach((main, index) => {
    // main.id = index;
    let callList = [];
    main.querySelectorAll('.call-func').forEach(call => {
      callList.push(call.innerText);
      // console.log(call.innerText);
    });
    mainBlock.push(main, callList);
    levels.push(mainBlock);
  });
  console.log(levels);
}
