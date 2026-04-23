
class uncommonCharacters{
method (str1,str2){
   const res = [];
   for (let i = 0; i < str1.length; i++){
      if (!(str2.includes(str1[i]))){
         res.push(str1[i])
      }
   }
   for (let i = 0; i < str2.length; i++){
      if (!(str1.includes(str2[i]))){
         res.push(str2[i])
      }
   }
   return res.join("");
}
}

let obj = new uncommonCharacters()
obj.method("geeksforgeeks","geeksquiz")
