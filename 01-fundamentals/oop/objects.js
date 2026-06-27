const alien = {
    "name" : "Test",
    "age" : 25,
    "Laptop" : {
        "name" : "HP",
        "RAM" : "8GB"
    }
}


for(const key in alien){
    console.log(key, alien[key])
}