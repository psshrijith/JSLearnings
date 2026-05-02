function isAlphaNumeric(char) {
    let code = char.charCodeAt(0);

    return (
        (code >= 48 && code <= 57) ||
        (code >= 65 && code <= 90) ||
        (code >= 97 && code <= 122)
    );
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
