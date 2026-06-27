function sortedFrequency(arr, num) {
    const left = 0;
    const right = arr.length - 1;
    let firstOccurrence = -1;
    
    function findFirstOccurrence() {
    let left = 0;
    let right = arr.length - 1;
    let firstOccurrence = -1;

        while(left <= right) {
            const mid = Math.floor((left + right) / 2);
            if(arr[mid] === num) {
                firstOccurrence = mid;
                right = mid - 1;
            } else if(arr[mid] < num) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return firstOccurrence;
    }

    function findLastOccurrence() {
    let left = 0;
    let right = arr.length - 1;
    let lastOccurrence = -1;

        while(left <= right) {
            const mid = Math.floor((left + right) / 2);
            if(arr[mid] === num) {
                lastOccurrence = mid;
                left = mid + 1;
            } else if(arr[mid] < num) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
            return lastOccurrence;
    }

    firstOccurrence = findFirstOccurrence();
    if(firstOccurrence === -1) return -1;

    const lastOccurrence = findLastOccurrence();

    return lastOccurrence - firstOccurrence + 1;
}

console.log(sortedFrequency([3,4,1,2], 4));
console.log(sortedFrequency([6,7,8,9,1,2,3,4], 8));
