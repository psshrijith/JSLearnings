class implementStrStr{
    method(str){
        return str.includes("am");
    }
}

let obj = new implementStrStr();
console.log(obj.method("Iam"));