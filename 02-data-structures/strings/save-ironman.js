class saveIronMan{
    method(str){
        const fString = str.replace(/[^a-zA-Z]/g, "");
        console.log(fString);
    }
}

const obj = new saveIronMan();
obj.method("I am :IronnorI Ma, i");