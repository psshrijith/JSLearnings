// function arethereDuplicates(...arr) {
//     console.log(arr);
//     let frequencyCounter = {};

//     for(let val of arr){
//         frequencyCounter[val] = (frequencyCounter[val] || 0) + 1;
//     }

//     for(let key in frequencyCounter){
//         if(frequencyCounter[key] > 1) return true;
//     }
//     return false;
// }

// using two pointers
function arethereDuplicates(...arr) {
    arr.sort();
    let left = 0;
    let right = 1;
    
    while(right < arr.length){
        if(arr[left] !== arr[right]) {
            left++;
            right++;
        } else {
            return true;
        }
    }
    return false;
}

console.log(arethereDuplicates(1,2,3));
console.log(arethereDuplicates(1,2,2));
console.log(arethereDuplicates('a', 'b', 'c', 'a'));