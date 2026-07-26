function twoSum(nums, target) {
    let right = nums.length - 1;
    let left = 0;

    while(left < right) {
        if(nums[left] + nums[right] === target) {
            return [left, right];
        }
        if(nums[left] + nums[right] > target) {
            right--;
        } else {
            left++;
        }
    }
}

console.log(twoSum([-4, -3, -2, -1,0 , 1, 2, 5], 0));
