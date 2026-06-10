function countZeroes(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === 0) {
            if(arr[mid-1] === 1 || mid === 0) {
                return arr.length - mid;
            } else {
                right = mid - 1;
            }
        } else {
            left = mid + 1;
        }
    }

    return 0;
}

console.log(countZeroes([1,1,1,1,0,0])); // 2
console.log(countZeroes([1,0,0,0])); // 3
console.log(countZeroes([0,0,0])); // 3
console.log(countZeroes([1,1,1])); // 0