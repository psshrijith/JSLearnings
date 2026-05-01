function removeElement(array, val){
    let i=0;
    for(let j=0;j<array.length;j++){
        if(array[j] !== val){
           array[i] = array[j];
           i++;
        }
    }
    return i;
}

console.log(removeElement([3,2,2,3], 3))
