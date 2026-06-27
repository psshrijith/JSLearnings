function isSubsequence(message, string) {
    let left = 0;
    let result = "";
    for(const j of string){
        if(j === message[left]){
            result += j;
            left++;
        }


    }
    return result===message;
}

console.log(isSubsequence("hello", "hello world"));
console.log(isSubsequence("sing", "sting"));
console.log(isSubsequence("abc", "abracadabra"));
console.log(isSubsequence("abc", "acb"));