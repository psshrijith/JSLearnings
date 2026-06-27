class implementStrStr{
    method(str){
        return str.includes("am");
    }
}

const obj = new implementStrStr();
console.log(obj.method("Iam"));