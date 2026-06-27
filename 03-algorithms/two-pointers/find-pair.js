function findPair(arr, target) {

    const frequency = {};
    
    for (const num of arr) {
        frequency[num] = (frequency[num] || 0) + 1;
    }

    for (const num of arr) {
        const complement = num - target;
        if (complement in frequency ) {
            if (complement === num) {
                if (frequency[complement] > 1) {
                    return true;
                }  
            }
            else{
                return true;
            }
        }
    }
    return false;
}

console.log(findPair([6,1,4,10,2,4], 2)); // true
console.log(findPair([8,6,2,4,1,0,2,5,13],1)); // true
console.log(findPair([4,-2,3,10],-6)); // true
console.log(findPair([6,1,4,10,2,4], 22)); // false
console.log(findPair([], 0)); // false
console.log(findPair([5,5], 0)); // true
console.log(findPair([-4,4], -8)); // true
console.log(findPair([-4,4], 8)); // true
console.log(findPair([1,3,4,6],-2)); // true
console.log(findPair([0,1,3,4,6],-2)); // true
 console.log(findPair([1,2,3], 0)); // false