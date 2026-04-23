let testString = "test"
let reversedString = ""

for(let i = testString.length-1;i>=0;i--){
    reversedString += testString[i];
}

if(testString===reversedString){
    console.log("Palindrome")
}
else{
    console.log("Not a palindrome")
}
