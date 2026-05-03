class Anagram{
    anagram(str1, str2){
        return str1.split("").sort().join("") == str2.split("").sort().join("")
    }
}


let obj = new Anagram();
console.log(obj.anagram("geeksforgeeks", "forgeeksgeeks"))
