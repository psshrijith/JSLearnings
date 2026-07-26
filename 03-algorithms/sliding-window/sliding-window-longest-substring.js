function longestSubstring(s) {
  let longest = 0;
  let left = 0;
  const seen = {};

  for(let right=0;right<s.length;right++) {
    const char = s[right];

    if(seen[char] !== undefined) {
      left = Math.max(left, seen[char] + 1);
    }

    seen[char] = right;
    longest = Math.max(longest, right - left + 1);
  }

  return longest;
}

console.log(longestSubstring("abcabcbb")); // 3
console.log(longestSubstring("bbbbb")); // 1
console.log(longestSubstring("pwwkew")); // 3
