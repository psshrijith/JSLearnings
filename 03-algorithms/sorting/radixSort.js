function getDigit(num, i){
    return Math.floor((Math.abs(num) / Math.pow(10, i)) % 10);
}

function digitCount(num){
    if(num===0) return 1;
    return Math.floor(Math.log10(Math.abs(num))+1);
}

function maxDigitCount(arr){
    let max = 0;

    for(let num of arr){
        max = Math.max(max, digitCount(num));
    }
    return max;
}

function radixSort(nums){
    let negatives = nums.filter((num) => num< 0).map(n => -n);
    let positives = nums.filter((num) => num >= 0);

    positives = radixSortPositives(positives);
    negatives = radixSortPositives(negatives);

    return [...negatives.reverse().map(n=>-n), ...positives]
}


function radixSortPositives(nums){
    if(nums.length === 0) return nums;
    let maxDigit = maxDigitCount(nums);
    for(let i=0;i<maxDigit;i++){
        let digitBucket = Array.from({length:10}, () => []);

        for(let k=0;k<nums.length;k++){
            let index = getDigit(nums[k], i);
            digitBucket[index].push(nums[k]);
        }
        nums = [].concat(...digitBucket);
        console.log("nums", nums)

    }
    return nums;

}

console.log(radixSort([34,3313,133131,1,33,-1,0,12]));
