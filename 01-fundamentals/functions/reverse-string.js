let actualText = "madam";
let reversedText = "";

for(let i=actualText.length-1;i>=0;i--){
    reversedText += actualText[i];
}

console.log(reversedText);

if(actualText===reversedText){
    console.log("The text is a palindrome")
}
else{
    console.log("The text is not a panlindrome")
}