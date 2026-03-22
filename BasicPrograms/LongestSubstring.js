let a = "dvdf";
let set = new Set();
let maxLength = 0;
let left = 0;

for(let i=0;i<a.length;i++){
    while(set.has(a[i])){
        set.delete(a[left]);
        left++;
    }
    set.add(a[i]);
    maxLength = Math.max(maxLength, set.size);
}

console.log(maxLength);