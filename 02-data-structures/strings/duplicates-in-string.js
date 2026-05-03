let string = "Big black bug bit a big black dog on his big black nose".split(" ");
const set = new Set();

for(let j of string){
    if(set.has(j)){
        console.log("Element already exists - ", j)
    }
    else{
        set.add(j);
    }
}