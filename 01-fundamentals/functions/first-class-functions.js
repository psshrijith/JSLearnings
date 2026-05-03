function hello(){
    return "hello "
}

function first(func, value){
    return hello() + value+"how are you?"
}

console.log(first(hello,"user! "))
