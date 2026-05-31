function squares(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const frequencyCounter1 = {};
  const frequencyCounter2 = {};

  for (let val of arr1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }

  for (let val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }

  for(let key in frequencyCounter1) {
    if(!(key**2 in frequencyCounter2)) {
      return false;
    }

    if(frequencyCounter2[key**2] !== frequencyCounter1[key]) {
      return false;
    }
  }

  return true;
}

squares([1, 2, 3], [1, 4, 9]);
squares([1, 2, 3], [1, 4, 9, 9]);
squares([1, 2, 3], [1, 4]);
squares([1, 2, 1], [4, 1, 1]);