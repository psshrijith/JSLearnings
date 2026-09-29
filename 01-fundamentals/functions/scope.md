# JavaScript Scope

## What is Scope?

**Scope** defines **where a variable can be accessed in your code**.

In JavaScript, the main types of scope are:

* Global Scope
* Function Scope
* Block Scope
* Module Scope

---

# 1. Global Scope

A variable declared outside any function or block is in the **global scope**.

It can be accessed from other scopes inside that program.

```js
const name = "John";

function sayHello() {
  console.log(name);
}

sayHello();
```

Output:

```text
John
```

`name` is in the global scope, so `sayHello()` can access it.

### Think of it as:

```text
Global Scope
│
├── name
│
└── sayHello()
      └── can access name
```

---

# 2. Function Scope

Variables declared inside a function are available only inside that function.

```js
function test() {
  const message = "Hello";

  console.log(message);
}

test();

console.log(message); // ❌ Error
```

`message` belongs to the scope of `test()`.

It cannot be accessed outside the function.

### Think of it as:

```text
Global Scope
│
└── test()
      │
      └── message
```

`message` exists inside `test()`, but not outside it.

> `var` is also function-scoped, while `let` and `const` are block-scoped.

---

# 3. Block Scope

A **block** is anything inside `{ }`, such as an `if`, `for`, or `while` block.

Variables declared using `let` and `const` are **block-scoped**.

```js
function test() {
  if (true) {
    const message = "Hello";

    console.log(message); // ✅ Works
  }

  console.log(message); // ❌ Error
}
```

`message` exists only inside the `if` block.

### Another example

```js
if (true) {
  let x = 10;
  const y = 20;

  console.log(x); // 10
  console.log(y); // 20
}

console.log(x); // ❌ Error
console.log(y); // ❌ Error
```

### Think of it as:

```text
Function Scope
│
└── if block
      │
      ├── x
      └── y
```

---

# 4. Module Scope

When JavaScript uses **ES modules**, variables declared in a file belong to that module by default.

For example:

### `math.js`

```js
const PI = 3.14;

export function circleArea(radius) {
  return PI * radius * radius;
}
```

`PI` belongs to the module scope of `math.js`.

Another file cannot directly access `PI`:

### `app.js`

```js
console.log(PI); // ❌ Error
```

But we can explicitly export something:

```js
// math.js

const PI = 3.14;

export function circleArea(radius) {
  return PI * radius * radius;
}
```

And import it:

```js
// app.js

import { circleArea } from "./math.js";

console.log(circleArea(5));
```

So module scope gives each JavaScript module its **own private scope**.

---

# Lexical Scope

Lexical scope is one of the most important concepts to understand because it is the foundation of **closures**.

### Simple definition

> **Lexical scope means a function can access variables based on where the function was written in the code, not where the function is called.**

Consider this:

```js
const name = "Shrijith";

function greet() {
  console.log(name);
}

function anotherFunction() {
  const name = "Rahul";

  greet();
}

anotherFunction();
```

Output:

```text
Shrijith
```

Why?

Because `greet()` was **written in the global scope**.

It was not written inside `anotherFunction()`.

Therefore, when `greet()` looks for `name`, it looks in the scope where `greet()` was created.

It finds:

```js
const name = "Shrijith";
```

It does **not** use:

```js
const name = "Rahul";
```

from `anotherFunction()`.

---

# Visualizing Lexical Scope

```text
Global Scope
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
```

`greet()` is lexically connected to the **Global Scope** because that is where it was defined.

So:

```js
greet();
```

will look for `name` in:

```text
greet()
   ↓
Global Scope
   ↓
name = "Shrijith"
```

It does **not** look at the caller's local scope:

```text
anotherFunction()
   ↓
name = "Rahul"
```

---

# Important Rule

### JavaScript does NOT use the caller's scope.

Instead:

> **JavaScript uses the scope where a function was defined.**

Compare:

```js
const name = "Shrijith";

function greet() {
  console.log(name);
}
```

The important thing is **where `greet` was written**, not where `greet()` is called.

---

# Scope vs Lexical Scope

### Scope

Answers:

> **Where can I access this variable?**

### Lexical Scope

Answers:

> **Which surrounding scopes can this piece of code access based on where it was written?**

---
