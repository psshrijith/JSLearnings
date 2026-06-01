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

console.log(maximumSumSubarray([1,2,5,2,8,1,5], 4));

//Optimized Solution
function maximumSumSubarray(arr, k) {
    let sum = 0;
    let windowSum = 0;
    for(let i = 0; i < k; i++){
        sum += arr[i];
    }

    windowSum = sum;

    for(let i = k; i < arr.length; i++){
        sum += arr[i] - arr[i-k];
        windowSum = Math.max(windowSum, sum);
    }
    return windowSum;
}

console.log(maximumSumSubarray([1,2,5,2,8,1,5], 4));

