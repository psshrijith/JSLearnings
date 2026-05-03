class saveIronMan{
    method(str){
        let fString = str.replace(/[^a-zA-Z]/g, "");
        console.log(fString);
    }
}

let obj = new saveIronMan();
obj.method("I am :IronnorI Ma, i");