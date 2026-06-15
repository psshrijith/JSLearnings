function capitalizeFirst(arr) {
    let result = [];

    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i] = capitalizeFirst(arr[i]);
        result.push(arr[i]);
    }   

    return result;
}

console.log(capitalizeFirst(['car', 'taco', 'banana'])); // Output: ['Car', 'Taco', 'Banana']


function capitalizeFirst(arr) {
    let result = [];

    if (arr.length === 0) {
        return result;
    }

    result.push(arr[0].charAt(0).toUpperCase() + arr[0].slice(1));
    return result.concat(capitalizeFirst(arr.slice(1)));
}

console.log(capitalizeFirst(['car', 'taco', 'banana'])); // Output: ['Car', 'Taco', 'Banana']