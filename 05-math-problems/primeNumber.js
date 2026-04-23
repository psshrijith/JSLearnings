class primeNumber{
    primeNum(N){
        let count = 0;
        for(let i=2;i<=N;i++){
            if(N%i==0){
                count++;
            }
        }
        return count==1;
    }
}

let obj = new primeNumber();
console.log(obj.primeNum(13));