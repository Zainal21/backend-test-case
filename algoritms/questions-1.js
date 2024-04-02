function reverseStringOrNumber(inputStringOrNumber) {
  const length = inputStringOrNumber.length;
  const lastCharacter = inputStringOrNumber[length - 1];
  const remainingString = inputStringOrNumber.substring(0, length - 1);
  const reversedString = remainingString.split("").reverse().join("");
  return `${reversedString}${lastCharacter}`;
}

console.log(reverseStringOrNumber("NEGIE1"));
