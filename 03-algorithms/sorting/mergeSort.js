function merge(left, right){
    let i = 0;
    let j = 0;
    let result = [];

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

function recursion(arr){
    if(arr.length <= 1) return arr;
    let mid = Math.floor(arr.length/2);

    let left = arr.slice(0, mid);
    let right = arr.slice(mid);

    let leftresult = recursion(left);
    let rightresult = recursion(right);

    return merge(leftresult, rightresult);
}

const array = [3,1,2,4,5,9,8];
console.log(recursion(array));