function reverseVowels(reverseString){
    let j=reverseString.length-1;
    const arr = reverseString.split("")
    let i=0;
    const set = new Set(["a","e","i","o","u", "A", "E", "I", "O", "U"]);
    while(i<j){
        if(!set.has(arr[i])){
            i++;
        }
        else if(!set.has(arr[j])) {
            j--;
        }
        else{
            const temp=arr[i];
            arr[i]=arr[j];
            arr[j]=temp;
            i++;
            j--;
        }
    }
    return arr.join("");
    }

console.log(reverseVowels("leetcode"));