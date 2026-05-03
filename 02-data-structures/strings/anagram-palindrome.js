class anagram_palindrome{
    i = "geeksogeeks";
    map = new Map();
    ch = this.i.split("");
    count = 0;

    method(){
        for(let char of this.ch){
            if(!this.map.has(char)){
                this.map.set(char,1)
            }
            else{
                this.map.set(char,this.map.get(char)+1)
            }
        }

        for(let value of this.map.values()){
            if(value%2!==0) this.count++
        }
        return this.count>1;
    }
}

let v = new anagram_palindrome();
console.log(v.method())