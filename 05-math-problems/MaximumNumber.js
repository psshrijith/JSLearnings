let i = 0;

function maximumNumber(array){
    let j = array[0]
    for(i=0;i<array.length;i++){
        if(array[i]>j){
            j = array[i]
        }        
    }
    return i;
}


let array = [1,2,3,4]

console.log(maximumNumber(array))