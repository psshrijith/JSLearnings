const arr = [2, 3, -8, 7, -1, 2, 3];

let res = arr[0];
let maxEnding = arr[0];

function maximumSubArray() {
    for (let i = 1; i < arr.length; i++) {
        maxEnding = Math.max(maxEnding + arr[i], arr[i]);
        res = Math.max(res, maxEnding)
    }
    return res;
}

console.log(maximumSubArray())
