const array = [1,0,2,0,3,0]

function moveZeroes(array){
    let j = 0;
    for(let i=0;i<array.length;i++){
        if(array[i] !== 0){
            array[j] = array[i];
            j++;
        }
    }

    for(let i=j;i<array.length;i++){
        array[i] = 0;
    }
    return array;
}

console.log(moveZeroes(array))
