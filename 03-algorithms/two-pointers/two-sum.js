function twoSum(nums, target) {
    const result = [];
    const map = new Map();
    for(let i=0;i<nums.length;i++){
        if(map.has(target- nums[i])){
            result.push(map.get(target- nums[i]));
            result.push(i);
            break;
        }
        map.set(nums[i], i);
    }
    return result;
}

console.log(twoSum([2,7,11,15], 9))
