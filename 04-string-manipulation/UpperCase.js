class upperCaseConversion{
    upperCov(str){
        let str1 = str.split(" ")
        let nstr = ""
        for(let j of str1){            
            nstr += j[0].toUpperCase()+j.substr(1)
            nstr += " "
        }
        console.log(nstr)
    }
}

let obj = new upperCaseConversion();
obj.upperCov("i love programming")


