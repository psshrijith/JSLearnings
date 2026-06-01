function maximumSumSubarray(arr, k) {
    let sum = 0;
    let maxSum = 0;
    for(let i = 0; i < arr.length; i++){
        console.log("sum starting: ", sum, "maxSum starting: ", maxSum);
        sum += arr[i];
        for(let j = i+1; j < i+k; j++){
            sum += arr[j];
        }
        if(sum > maxSum){
            maxSum = sum;
            sum = 0;
        }
        console.log("sum: ", sum, "maxSum: ", maxSum);

    }
    return maxSum;
}

console.log(maximumSumSubarray([1,2,5,2,8,1,5], 4))