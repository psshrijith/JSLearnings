function checkSpam(str){
    if(str.toLowerCase().includes("xxxxx") || str.toLowerCase().includes("viagra")){
        return true;
    }
    return false;
}

console.log(checkSpan("buy xXXXX now"))
