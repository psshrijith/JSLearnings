function capitalizeFirstIterative(arr) {
    let result = [];

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i] = capitalize(arr[i]);
        result.push(arr[i]);
    }

    return result;
}

console.log(capitalizeFirstIterative(['car', 'taco', 'banana'])); // Output: ['Car', 'Taco', 'Banana']


function capitalizeFirstRecursive(arr) {
    let result = [];

    if (arr.length === 0) {
        return result;
    }

    result.push(arr[0].charAt(0).toUpperCase() + arr[0].slice(1));
    return result.concat(capitalizeFirstRecursive(arr.slice(1)));
}

console.log(capitalizeFirstRecursive(['car', 'taco', 'banana'])); // Output: ['Car', 'Taco', 'Banana']

function capitalizeFirst(arr, index = 0) {
    if (index >= arr.length) {
        return [];
    }

    const first = arr[index].charAt(0).toUpperCase() + arr[index].slice(1);
    return [first].concat(capitalizeFirst(arr, index + 1));
}

console.log(capitalizeFirst(['car', 'taco', 'banana'])); // Output: ['Car', 'Taco', 'Banana']
