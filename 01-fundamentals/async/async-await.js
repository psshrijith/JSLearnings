function getInfo(){
    return new Promise((resolve, reject)=> {
        const randomNumber = Math.random();
        setTimeout(() => {
            if(randomNumber > 5){
            resolve("promise is resolved")
        }
        else{
            reject(randomNumber, "rejected")
        }
    }, 10000)
    })
}

async function getValue(){
    
    try{
        const result = getInfo();
        console.log(result);
    }
    catch(error){
        console.log(error)
    }
    
}

getValue()