const array = [0,5,11,1,3,2]
let result = array[0];

for (let i=1;i<array.length;i++){
    if(array[i]<result){
        result = array[i];
    }
}

console.log(result);