const array = [10,10,5];

function secondLargest(array){
    let largest = -Infinity;
    let sLargest = -Infinity;

    for(let i=0;i<array.length;i++){
        if(array[i]>largest){
            sLargest = largest;
            largest = array[i];
        }
        else if(array[i]>sLargest && array[i]!==largest){
            sLargest = array[i];
        }
    }
    return sLargest;
}


console.log(secondLargest(array))