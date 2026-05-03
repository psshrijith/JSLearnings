function isAlphaNumeric(char) {
    return /[a-z0-9]/i.test(char);
}

function palindrome(str){
    let left = 0;
    let right = str.length - 1;
    while(left<right){
        if (!isAlphaNumeric(str[left])){
            left++;
            continue;
        }
        if (!isAlphaNumeric(str[right])){
            right--;
            continue;
        }
        if(str[left].toLowerCase() !== str[right].toLowerCase()){
            return false;
        }
        left++;
        right--;
    }
    return true;
}

console.log(palindrome("A man, a plan, a canal: Panama"));
