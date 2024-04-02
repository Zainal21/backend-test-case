function countOccurrences(input, query) {
  const output = query.map(
    (word) => input.filter((item) => item === word).length
  );
  return output;
}

const inputArray = ["xc", "dz", "bbb", "dz"];
const queryArray = ["bbb", "ac", "dz"];

console.log(countOccurrences(inputArray, queryArray));
