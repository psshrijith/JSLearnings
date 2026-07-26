function FindAllDuplicates(nums) {
    const frequencyCounter = {};
    const duplicates = [];

    for(const num of nums){
        frequencyCounter[num] = (frequencyCounter[num] || 0) + 1;
    }

    for(const num in frequencyCounter){
        if(frequencyCounter[num] > 1){
            duplicates.push(Number(num));
        }
    }
    return duplicates;
}

console.log(FindAllDuplicates([4,3,2,7,8,2,3,1]));

//Solution 2

function FindAllDuplicates1(nums) {
    const duplicates = [];

    const set = new Set();
    
    for(const num of nums){
        if(set.has(num)){
            duplicates.push(num);
        } else {
            set.add(num);
        }
    }
    return duplicates;
}

console.log(FindAllDuplicates([4,3,2,7,8,2,3,1]));