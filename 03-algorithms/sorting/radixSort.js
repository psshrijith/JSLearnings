function getDigit(num, i){
    return Math.floor(Math.abs(num) / Math.pow(10,i)) % 10;
}

function digitCount(num){
    if(num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) +1;
}

function mostDigits(arr){
    return digitCount(Math.max(...arr));
}

console.log(digitCount(0));

console.log(mostDigits([1,200,5000]));
