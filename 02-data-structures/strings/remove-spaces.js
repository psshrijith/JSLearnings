const testString = "This is a sentence".split(" ");
let finalString = "";

for(const i of testString){
    finalString += i;
}

console.log(finalString)
