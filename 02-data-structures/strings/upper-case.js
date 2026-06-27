class upperCaseConversion{
    upperCov(str){
        const str1 = str.split(" ")
        let nstr = ""
        for(const j of str1){            
            nstr += j[0].toUpperCase()+j.substr(1)
            nstr += " "
        }
        console.log(nstr)
    }
}

const obj = new upperCaseConversion();
obj.upperCov("i love programming")


