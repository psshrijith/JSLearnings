function countUnique(arr) {
    let left = 0;
    let right = left+1;
    let unique = 1;
    
    if(arr.length === 0) return 0;
    while(right < arr.length){
        if(arr[left] !== arr[right]){
            unique++;
            left++;
            right++;
        }
        else if(arr[left] === arr[right]){
            right++;
        }

    }
    return unique;
}

console.log(countUnique([1, 2, 3, 4, 4, 4, 7,7, 12, 12, 13, 14, 15]))