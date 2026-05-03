let string = "dvdf";
let set = new Set();
let maxLength = 0;
let left = 0;

function LongestSubstring(s){
    for(let i=0;i<s.length;i++){
        if(set.has(a[i])){
            set.delete(a[left]);
            left++;
        }
        set.add(a[i]);
        maxLength = Math.max(maxLength, set.size);
    }
    
    return maxLength;
}

console.log(LongestSubstring(string));
