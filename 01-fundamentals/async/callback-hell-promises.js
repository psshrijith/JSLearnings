function startCoffeeMachine() {
  return new Promise((resolve) => {
    console.log('Starting the coffee Machine');
    setTimeout(function () {
      console.log('Coffee machine is ready');
      resolve('coffee machine is ready');
    }, 2000);
  });
}

function grindCoffeeBeans() {
  return new Promise((resolve) => {
    console.log('Grinding coffee beans');
    setTimeout(function () {
      console.log('Coffee beans are ready');
      resolve('Ground Coffee');
    }, 1000);
  });
}

function boilWater() {
  return new Promise((resolve) => {
    console.log('Boiling water');
    setTimeout(function () {
      console.log('Water is boiled');
      resolve('Boiled Water');
    }, 1000);
  });
}

startCoffeeMachine()
  .then(() => grindCoffeeBeans())
  .then((groundCoffee) => {
    console.log(groundCoffee);
    return boilWater();
  })
  .then((boilWater) => {
    console.log(boilWater);
  });
