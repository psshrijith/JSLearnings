/*
3 3 3 2 2 2 1 1 1
3 3 2 2 1 1 
3 2 1
*/


function pattern(n){
    g = n;
    for(let i=n;i>=1;i--){
        for(let j=n;j>=1;j--){
            for(let k=0;k<g;k++){
                console.log(j+" ");
            }
        }
        g--;
        console.log("\n");
    }
}

pattern(3);