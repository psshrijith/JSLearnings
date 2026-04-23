// N = 8
// output = 2, 3, 5, 7;

function findPrime(N){
    let arr = [];
    let count = 0;
    for(let i=2;i<N;i++){
        count = 0;
        for(j=2;j<=i;j++){
            if(i%j==0){
                count++;
            }
        }
        if(count==1) arr.push(i);
    }

    for(let i in arr){
        console.log(arr[i])
    }
}

findPrime(8);