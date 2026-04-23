let b="test"
let keyValue = 0;
var countMap = new Map();

for(let i=0;i<b.length;i++){
    if(!countMap.has(b[i])){
        countMap.set(b[i],1);
    }
    else{
        keyValue = countMap.get(b[i]);
        countMap.set(b[i],keyValue+1);
    }
}

console.log(countMap)