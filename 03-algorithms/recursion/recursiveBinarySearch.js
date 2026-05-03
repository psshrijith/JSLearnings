function recursiveBinarySearch(array,target, left=0, right=arr.length-1){
    if(left > right) {
        return -1
    }
    let mid = Math.floor((left + right) / 2);
    if (array[mid] === target) {
        return mid;
    }
    if (target < array[mid]) {
        return recursiveBinarySearch(array, target, left, mid - 1)
    }
    return recursiveBinarySearch(array, target, mid + 1, right);
}

const arr = [1, 3, 5, 7, 9, 11];
console.log(recursiveBinarySearch(arr, 7));