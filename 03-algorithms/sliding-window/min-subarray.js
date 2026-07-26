function minSubArrayLen(nums, target) {
  let minLength = Infinity;
  let left = 0;
  let right = 0;
  let sum = 0;

  while (right < nums.length) {
    sum += nums[right];

    while (sum >= target) {
      minLength = Math.min(minLength, right - left + 1);
      sum -= nums[left];
      left++;
    }

    right++;
  }

  return minLength === Infinity ? 0 : minLength;
}

console.log(minSubArrayLen([2, 3, 1, 2, 4, 3], 7));
