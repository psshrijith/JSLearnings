function removeDuplicatesAtmostK(nums) {
    if (nums.length === 0) return 0;

    let i = 2;

    for (let j = 2; j < nums.length; j++) {
        if (nums[j] !== nums[i-2]) {
            nums[i] = nums[j];
            i++;
            
        }

    }

    return i;
}

console.log(removeDuplicatesAtmostK([1, 1, 1,2,2,3]))
