function truncate(str, maxlength){
    if(!(maxlength > str.length)){
    let str1 = str.slice(0, maxlength);
    return str1 += "...";
    }
    return str;
}

console.log(truncate("Hi everyone!",20))