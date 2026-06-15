function bubbleSort(arr) {
    for(let i=0;i<arr.length;i++) {
        let swapped = false;
        for(let j=0;j<arr.length-1-i;j++) {
            console.log("i", i, "j", j);
            if(arr[j] > arr[j+1]) {
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                swapped = true;
            }
        }
        if(!swapped) {
            break;
        }
    }
    return arr;
}

const arr = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(arr)); // Output: [11, 12, 22, 25, 34, 64, 90]

const arr2 = [1,2,3,4,5];
console.log(bubbleSort(arr2)); // Output: [1, 2, 3, 4, 5]