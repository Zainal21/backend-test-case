function longestWord(sentence) {
  const words = sentence.split(" ");
  let maxLength = 0;
  let longestWord = "";

  for (const word of words) {
    const wordLength = word.length;
    if (wordLength > maxLength) {
      maxLength = wordLength;
      longestWord = word;
    }
  }

  return longestWord;
}

const sentence = "Saya sangat senang mengerjakan soal algoritma";
console.log(longestWord(sentence));
