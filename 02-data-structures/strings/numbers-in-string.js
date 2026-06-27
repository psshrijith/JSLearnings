const s = "sentence23"

for(const j of s){
    if(j>='0' && j<='9'){
        console.log("It is a number")
    }
    else{
        console.log("It is a string character")
    }
}