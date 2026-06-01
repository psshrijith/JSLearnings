function maximumSumSubarray(arr, k) {
    let sum = 0;
    let maxSum = 0;
    for(let i = 0; i < arr.length-k; i++){
        let sum = 0;
        for(let j = i; j < i+k; j++){
            sum += arr[j];
        }
        maxSum = Math.max(maxSum, sum);
    }
    return maxSum;
}

console.log(maximumSumSubarray([1,2,5,2,8,1,5], 4))