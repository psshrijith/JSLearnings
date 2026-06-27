class reverseWords{
    method(str){
        let n = "";
        const nWord = str.split(".");
        for(let i=nWord.length-1;i>=0;i--){
            n += nWord[i];
            if(i!==0) n+='.'
    }
    return n
}
}

const obj = new reverseWords();
console.log(obj.method("i.like.this.program.very.much"))