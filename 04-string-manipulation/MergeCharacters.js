class mergeCharacters{
    method(one, two){
        let result = "";
        for (let i = 0; i < one.length | i < two.length; i++) {
            if (i < one.length)
                result += one.at(i);
            if (i < two.length)
                result += two.at(i);
        }
        console.log(result);
    }
}

let obj = new mergeCharacters();
obj.method("hello","w")