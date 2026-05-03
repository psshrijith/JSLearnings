class mergeString{
    method(str1, str2){
        let max = Math.max(str1.length,str2.length)
        let newStr = ""
        for(let i=0;i<max;i++){
            if((str1[i] == undefined && str2[i]!=undefined)){
                newStr += str2.substr(i);
            }
            else if((str1[i] != undefined && str2[i]==undefined)){
                newStr += str1.substr(i);
                break;
            }
            else{
            newStr += str1[i]+str2[i]
        }
    }
        console.log(newStr)
    }
}

let obj = new mergeString();
obj.method("Hello","Bye")