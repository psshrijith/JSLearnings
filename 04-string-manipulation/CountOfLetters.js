let string = "example";
let letterCount = {};

for (let char of string) {
  if (/[a-zA-Z]/.test(char)) { // Check if character is a letter (a-z or A-Z)
    letterCount[char] = (letterCount[char] || 0) + 1; // Initialize count to 0 if absent, then increment
  }
}

console.log(letterCount)