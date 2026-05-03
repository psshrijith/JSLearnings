const a = () => {
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            resolve("Data from a")
        }, 2000);
    })
};

const b = () => {
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            reject("Data from b")
        }, 2000);
    })
};

Promise.allSettled([b(), a()]).then(results => {
            results.forEach(result => {
                if(result.status == 'fulfilled'){
                    console.log("Value :", result.value);
                }
                else{
                    console.error("Reason for rejection ", result.reason)
                }
            });
        });
