class pairsOfPrime{
    arr = [];
    pairOf(N){
        this.findPrime(N)
        for(let i=0;i<this.arr.length-1;i++){
            for(let j=0;j<this.arr.length;j++){
                if (this.arr[i]*this.arr[j]<=N){
                    console.log(this.arr[i]+" "+this.arr[j]);
                }
            }
        } 
    }

    findPrime(N){
    let count = 0;
        for(let i=2;i<N;i++){
            count = 0;
            for(let j=2;j<=i;j++){
                if(i%j==0){
                    count++;
            }
        }
        if(count==1) this.arr.push(i);
    }
    }
}

let obj = new pairsOfPrime();
obj.pairOf(8)