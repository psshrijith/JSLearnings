function sorter(arr){
    let i=-1;
    let j=0;
    let pivot = arr[arr.length-1];
    let temp = Infinity;

    while(j< arr.length-1){
        if(arr[j]<pivot){
            i++;
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        j++;
    }
    let temp1 = arr[i+1];
    arr[j] = temp1;
    arr[i+1] = pivot;

    return arr;

}

console.log(sorter([2,4,1,3]));