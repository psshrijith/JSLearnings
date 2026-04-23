let alien = {
    "name" : "Test",
    "age" : 25,
    "Laptop" : {
        "name" : "HP",
        "RAM" : "8GB"
    }
}


for(let key in alien){
    console.log(key, alien[key])
}