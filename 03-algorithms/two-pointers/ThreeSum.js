function ThreeSum(nums){
    nums.sort((a,b) => a - b)
    const result = []
    for(let i = 0; i < nums.length; i++){
        if(i > 0 && nums[i] === nums[i - 1]) continue;
        let left = i + 1;
        let right = nums.length - 1;
        while(left < right){
            const sum = nums[i] + nums[left] + nums[right];
            if(sum === 0){
                result.push([nums[i], nums[left], nums[right]]);
                left++;
                right--;
            }
            else if(sum < 0){
                left++;
            }
            else{
                right--;
            }         
    }
}
    return result;
}

console.log(ThreeSum([-1,0,1,2,-1,-4]));
