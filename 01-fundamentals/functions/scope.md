## What is a scope - scope is something where a variable can be accessed


Javascript has mainly
- Global scope
- Functional scope
- Block scope
- Module scope


- Global scope
/*
const name = "John";

function sayHello() {
  console.log(name);
}
/*

- Functional scope

function test() {
  const message = "Hello";

  console.log(message);
}

test();

console.log(message); // Error

- Block scope

function test(){
  if(a){
    const b = a;
  }
}

console.log(b); // Error

- Module scope

variables, functions, written in particular file or a module, is available only to that particular file/module not to the entire application or other files


## **Lexical Scope**

A function can access variables from the place where the function was written


const name = "Shrijith";

function greet() {
  console.log(name);
}

function anotherFunction() {
  const name = "Rahul";

  greet();
}

anotherFunction();

- This prints "Shrijith" because the greet function is not defined inside the anotherFunction. 

## Visualizing it

Global / outer scope
│
├── name = "Shrijith"
│
├── greet()
│     │
│     └── console.log(name)
│
└── anotherFunction()
      │
      └── name = "Rahul"
