let value = "eceba";
let k=2;
let map = new Map();
let maxLength = 0;
let left = 0;
let string = "";

for(let i=0;i<value.length;i++){
    map.set(value[i], (map.get(value[i]) || 0) + 1);
    while(map.size > k){
        map.set(value[left], map.get(value[left]) - 1);
        if(map.get(value[left]) === 0){
            map.delete(value[left]);
        }
        left++;
    }
        maxLength = Math.max(maxLength, i - left + 1);
        
    }

console.log(maxLength);