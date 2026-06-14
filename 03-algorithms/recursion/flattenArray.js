function flattenArray(arr) {
    let result = [];

    console.log("array", arr)
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            console.log(arr);
            result = result.concat(flattenArray(arr[i]));
        } else {
            result.push(arr[i]);gi
        }
    }

    return result;
}

console.log(flattenArray([[1,2,3,4],[5,7,7,33]]));
