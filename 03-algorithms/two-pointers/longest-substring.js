const string = "dvdf";
const set = new Set();
let maxLength = 0;
let left = 0;

function LongestSubstring(s){
    for(let i=0;i<s.length;i++){
        if(set.has(s[i])){
            set.delete(s[left]);
            left++;
        }
        set.add(s[i]);
        maxLength = Math.max(maxLength, set.size);
    }
    
    return maxLength;
}

console.log(LongestSubstring(string));
