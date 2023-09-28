const list = [1, 3, 5, 7, 9];

function binarySearch(myGuess) {
  let lower = 0;
  let higher = list.length - 1;

  while (lower <= higher) {
    const middleIndex = parseInt((lower + higher) / 2);

    let currentValue = list[middleIndex];

    if (currentValue === myGuess) {
      return middleIndex;
    }

    if (currentValue > myGuess) {
      higher = middleIndex - 1;
    } else {
      lower = middleIndex + 1;
    }
  }
}

console.log(binarySearch(3));
