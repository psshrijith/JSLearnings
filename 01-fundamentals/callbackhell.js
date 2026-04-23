function startCoffeeMachine(callback){
    console.log("Starting the coffee Machine");
    setTimeout(function(){
        console.log("Coffee machine is ready");
        callback("coffee machine is ready")
    },2000);
}

function grindCoffeeBeans(callback){
    console.log("Grinding coffee beans");
    setTimeout(function(){
        console.log("Coffee beans are ready");
        callback("Ground Coffee");
    }, 1000);
}

function boilWater(callback){
    console.log("Boiling water");
    setTimeout(function(){
        console.log("Water is boiled");
        callback("Boiled Water");
    }, 1000);
}

startCoffeeMachine(function (coffeeMachineStatus){
   grindCoffeeBeans(function (groundCoffee){
    boilWater(function (boiledWater){
        console.log(boiledWater)
    })
   })
})

