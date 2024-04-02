function diagonalDifference(matrix) {
  const size = matrix.length;
  let firstDiagonalSum = 0;
  let secondDiagonalSum = 0;

  for (let i = 0; i < size; i++) {
    firstDiagonalSum += matrix[i][i];
    secondDiagonalSum += matrix[i][size - i - 1];
  }

  return Math.abs(firstDiagonalSum - secondDiagonalSum);
}

const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(diagonalDifference(matrix));
