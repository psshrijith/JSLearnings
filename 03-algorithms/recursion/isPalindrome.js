function reverseString(str) {
    let str2 = "";
    const str3 = "";
    if (str.length === 0) {
        return '';
    }
    str2 += str[str.length - 1] + reverseString(str.slice(0, str.length - 1));
    console.log(str2);
    return str2;
}

function isPalindrome(str) {
    return str === reverseString(str); 
}

console.log(isPalindrome('racecar')); // Output: true
console.log(isPalindrome('hello')); // Output: false
