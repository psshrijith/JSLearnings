function findNumber(arr, num) {

    while(left<=right){
        let mid = Math.floor((left+right)/2);

        if(arr[mid] === num) {
            return true;
        }

        if(arr[left] <= arr[mid]) {
            if(num>=arr[left] && num<arr[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        else {
            if(num>arr[mid] && num<=arr[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return false;
    }

console.log(findNumber([4,5,6,7,0,1,2], 0));