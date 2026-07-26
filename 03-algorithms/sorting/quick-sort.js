function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;

            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    return i + 1;
}

function quickSort(arr, low, high){
    if(low>=high) return;

    const pivotIndex = partition(arr, low, high);

    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
}

const arr = [2, 4, 1, 3];
quickSort(arr, 0, arr.length - 1);
console.log(arr);