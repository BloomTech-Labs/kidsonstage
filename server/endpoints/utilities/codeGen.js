codeFiller = () => {
  let possible = "ACEKNRSTXZ";
  return possible.charAt(Math.floor(Math.random() * possible.length));
}

export default codeGen = num => {
  let numArr = num.toString().split('');
  let startLen = numArr.length;

  if (numArr.length < 6) {
    while (numArr.length < 6) {
      numArr.unshift(codeFiller());
    }
  }
 
  numArr.splice(3,0,'-');
  
  return numArr.join('');
};

// console.log(codeGen(1));
// console.log(codeGen(2));
// console.log(codeGen(313));
// console.log(codeGen(4242));
// console.log(codeGen(57575));
// console.log(codeGen(696969));

