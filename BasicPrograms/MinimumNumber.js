const array = [0,5,11,1,3,2]
let result = array[0];

function minimumNumber(array) {
    for (let i = 1; i < array.length; i++) {
        if (array[i] < result) {
            result = array[i];
        }
    }
    return result;
}

console.log(minimumNumber(array));