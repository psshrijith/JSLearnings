function FindAllDuplicates(nums) {
    const frequencyCounter = {};
    const duplicates = [];

    for(let num of nums){
        frequencyCounter[num] = (frequencyCounter[num] || 0) + 1;
    }

    for(let num in frequencyCounter){
        if(frequencyCounter[num] > 1){
            duplicates.push(num);
        }
    }
    return duplicates;
}

console.log(FindAllDuplicates([4,3,2,7,8,2,3,1]));