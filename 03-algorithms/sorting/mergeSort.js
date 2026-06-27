function merge(left, right){
    let i = 0;
    let j = 0;
    const result = [];

    while(i < left.length && j < right.length){

        if(left[i] < right[j]){
            result.push(left[i]);
            i++;
        }
        else{
            result.push(right[j]);
            j++;
        }
    }

    while(i < left.length){
        result.push(left[i]);
        i++;
    }

    while(j < right.length){
        result.push(right[j]);
        j++;
    }
    return result;
}

function mergeSort(arr){
    if(arr.length <= 1) return arr;
    const mid = Math.floor(arr.length/2);

    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    const leftresult = mergeSort(left);
    const rightresult = mergeSort(right);

    return merge(leftresult, rightresult);
}

const array = [3,1,2,4,5,9,8];
console.log(mergeSort(array));