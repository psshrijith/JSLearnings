# Function Declaration vs Function Expression — Hoisting

## 1. Function Declaration

A **function declaration** is created using the `function` keyword directly:

```js
function sayHello() {
  console.log("Hello");
}
```

JavaScript allows us to call a function declaration **before it appears in the code**:

```js
sayHello();

function sayHello() {
  console.log("Hello");
}
```

### Why does this work?

Before JavaScript executes the code line by line, it prepares the execution context.

During this preparation, JavaScript creates the function:

```text
sayHello → function
```

So when execution reaches:

```js
sayHello();
```

the function is already available.

### Mental model

```text
Creation phase
      ↓
sayHello → function
      ↓
Execution phase
      ↓
sayHello() → works
```

---

# 2. Function Expression

A **function expression** is when a function is created and assigned to a variable.

```js
const sayHello = function () {
  console.log("Hello");
};
```

Unlike a function declaration, we cannot call it before the assignment:

```js
sayHello(); // ❌ ReferenceError

const sayHello = function () {
  console.log("Hello");
};
```

### Why?

The variable `sayHello` exists during the creation phase, but because it is declared with `const`, it is initially **uninitialized**.

Conceptually:

```text
Creation phase
      ↓
sayHello → uninitialized
      ↓
Execution starts
      ↓
sayHello() → ❌ ReferenceError
      ↓
const sayHello = function () {}
      ↓
sayHello → function
```

The function value is assigned only when JavaScript reaches:

```js
const sayHello = function () {};
```

---

# 3. The Important Difference

### Function declaration

```js
sayHello();

function sayHello() {
  console.log("Hello");
}
```

During the creation phase:

```text
sayHello → function
```

Therefore:

```js
sayHello(); // ✅ Works
```

---

### Function expression

```js
sayHello();

const sayHello = function () {
  console.log("Hello");
};
```

During the creation phase:

```text
sayHello → uninitialized
```

Therefore:

```js
sayHello(); // ❌ ReferenceError
```

---

# 4. What Does "Hoisted" Actually Mean?

It is common to hear:

> "Function declarations are hoisted, but function expressions are not."

This is a useful beginner explanation, but it is not completely accurate.

A better way to understand it is:

### Function declaration

The function itself is created during the creation phase.

```js
function add(a, b) {
  return a + b;
}
```

Conceptually:

```text
add → function
```

---

### Function expression with `const`

The variable binding is created, but it is not initialized with the function until execution reaches the assignment.

```js
const add = function (a, b) {
  return a + b;
};
```

Conceptually:

```text
Creation phase:

add → uninitialized


Execution phase:

add = function
```

So saying:

> "Function expressions are not hoisted"

is an oversimplification.

A more accurate statement is:

> The variable binding exists during the creation phase, but the function value is assigned during execution.

---

# 5. What Happens With `var`?

Consider:

```js
sayHello();

var sayHello = function () {
  console.log("Hello");
};
```

This also doesn't work, but the reason is different.

For `var`, JavaScript initializes the variable to `undefined` during the creation phase.

Conceptually:

```text
Creation phase:

sayHello → undefined
```

Then:

```js
sayHello();
```

is effectively trying to do:

```js
undefined();
```

So JavaScript throws:

```text
TypeError: sayHello is not a function
```

Later, execution reaches:

```js
var sayHello = function () {};
```

and the function is assigned.

---

# 6. Declaration vs Expression

| Code                        | Creation phase        | Can call before declaration? |
| --------------------------- | --------------------- | ---------------------------- |
| `function foo() {}`         | `foo → function`      | ✅ Yes                        |
| `var foo = function() {}`   | `foo → undefined`     | ❌ No                         |
| `let foo = function() {}`   | `foo → uninitialized` | ❌ No                         |
| `const foo = function() {}` | `foo → uninitialized` | ❌ No                         |

---

# 7. Function Declaration

```js
function greet() {
  console.log("Hello");
}

greet();
```

The function can be called normally.

It can also be called before its position in the code:

```js
greet();

function greet() {
  console.log("Hello");
}
```

---

# 8. Function Expression

```js
const greet = function () {
  console.log("Hello");
};

greet();
```

The function should be used after its assignment:

```js
const greet = function () {
  console.log("Hello");
};

greet(); // ✅
```

Not:

```js
greet(); // ❌

const greet = function () {};
```

---

# 9. Arrow Functions Are Also Function Expressions

Arrow functions are function expressions when assigned to a variable:

```js
const greet = () => {
  console.log("Hello");
};
```

This will fail:

```js
greet(); // ❌ ReferenceError

const greet = () => {
  console.log("Hello");
};
```

Because the arrow function is assigned to `greet` during execution.

---

# 10. Important: Lexical Scope vs Lexical `this`

The word **lexical** can be confusing because it is used in two related but different ideas.

### Lexical scope

Lexical scope answers:

> **"Where can this variable be accessed?"**

For example:

```js
const name = "Shrijith";

function greet() {
  console.log(name);
}
```

`greet()` can access `name` because `name` is in its surrounding lexical scope.

Normal functions have **lexical scope**.

---

### Lexical `this`

Lexical `this` answers:

> **"Where does this function get its `this` from?"**

This is where arrow functions are different.

Normal functions:

```text
this → determined by how the function is called
```

Arrow functions:

```text
this → taken from the surrounding context
```

So:

```text
Normal function:

variables → lexical scope
this      → call-site


Arrow function:

variables → lexical scope
this      → surrounding context
```

---

# 11. Normal Function `this`

Consider:

```js
const user = {
  name: "Shrijith",

  greet: function () {
    console.log(this.name);
  }
};

user.greet();
```

When we call:

```js
user.greet();
```

the function is called as a method of `user`.

Therefore:

```text
this → user
```

Output:

```text
Shrijith
```

The important point is that a normal function has its **own `this`**, and that `this` is determined by how the function is called.

---

# 12. The Same Function Can Have Different `this`

Consider:

```js
const user1 = {
  name: "Shrijith",

  greet: function () {
    console.log(this.name);
  }
};

const user2 = {
  name: "Rahul"
};

user2.greet = user1.greet;

user1.greet(); // Shrijith
user2.greet(); // Rahul
```

The same function is being used:

```js
user1.greet
```

and:

```js
user2.greet
```

But `this` changes based on the caller:

```text
user1.greet()
      ↓
this = user1


user2.greet()
      ↓
this = user2
```

This is an important reason normal functions have dynamic `this`.

---

# 13. Arrow Functions Have Lexical `this`

Arrow functions do not create their own `this`.

Instead, they use `this` from the surrounding context.

Example:

```js
const user = {
  name: "Shrijith",

  greet() {
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
  }
};
```

When we call:

```js
user.greet();
```

the `greet` method has:

```text
this → user
```

The arrow function does not create a new `this`.

Instead:

```text
greet's this
     ↓
arrow function
     ↓
uses surrounding this
     ↓
user
```

Therefore:

```text
Shrijith
```

---

# 14. Could JavaScript Have Made Normal Functions Use Lexical `this`?

**Yes.**

JavaScript could theoretically have designed all functions so that `this` was lexical.

But normal functions were designed to allow `this` to depend on **how the function is called**.

For example:

```js
const user1 = {
  name: "Shrijith",
  greet: function () {
    console.log(this.name);
  }
};

const user2 = {
  name: "Rahul",
  greet: user1.greet
};

user1.greet(); // Shrijith
user2.greet(); // Rahul
```

The same function can work with different objects:

```text
user1.greet()
      ↓
this = user1


user2.greet()
      ↓
this = user2
```

If normal functions had lexical `this`, the surrounding context would determine `this` instead.

That would remove this useful behavior.

---

# 15. Why Were Arrow Functions Introduced?

Arrow functions provide the opposite behavior:

> "I don't want my own `this`. I want to use the surrounding `this`."

This is particularly useful with callbacks.

Without an arrow function:

```js
const user = {
  name: "Shrijith",

  greet() {
    setTimeout(function () {
      console.log(this.name);
    }, 1000);
  }
};
```

The callback is a normal function and has its own `this`.

With an arrow function:

```js
const user = {
  name: "Shrijith",

  greet() {
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
  }
};
```

The arrow function uses the surrounding `this`.

---

# 16. Normal Function vs Arrow Function

| Behavior                              | Normal Function         | Arrow Function |
| ------------------------------------- | ----------------------- | -------------- |
| Lexical variable scope                | ✅ Yes                   | ✅ Yes          |
| Creates its own `this`                | ✅ Yes                   | ❌ No           |
| `this` determined by call             | ✅ Yes                   | ❌ No           |
| `this` comes from surrounding context | ❌                       | ✅              |
| Can be used as constructor            | ✅ Yes                   | ❌ No           |
| Has `arguments` object                | ✅ Yes                   | ❌ No           |
| Function declaration hoisting         | ✅ Function declarations | N/A            |

---

# 17. The Most Important Distinction

Don't think:

> "Normal functions are not lexical."

That's incorrect.

Normal functions **are lexically scoped**.

The difference is specifically about `this`.

```text
Normal function

Lexical scope       → surrounding lexical scope
this                → determined by how it is called


Arrow function

Lexical scope       → surrounding lexical scope
this                → surrounding this
```

### One sentence to remember

> **Normal functions have lexical variable scope, but their `this` is determined by how they are called. Arrow functions have lexical variable scope and lexical `this`.**

---

# 18. Easy Mental Model

When you see:

```js
function foo() {}
```

think:

```text
Function declaration
        ↓
Function created during setup
        ↓
Can be called before its position
```

When you see:

```js
const foo = function () {};
```

think:

```text
Function expression
        ↓
Variable created during setup
        ↓
Function assigned during execution
        ↓
Available after assignment
```

When you see:

```js
const foo = () => {};
```

think:

```text
Arrow function
        ↓
Function expression
        ↓
Assigned during execution
        ↓
Does NOT create its own this
        ↓
Uses surrounding this
```

---

# Key Takeaways

* **Function declarations are initialized during the creation phase.**
* Therefore, they can be called before they appear in the code.
* **Function expressions are assigned to variables during execution.**
* `const` and `let` variables are created but remain **uninitialized** until their declaration is executed.
* `var` variables are initialized with `undefined`.
* Arrow functions are also function expressions.
* Saying "function expressions are not hoisted" is a simplified explanation.
* **Normal functions have lexical variable scope.**
* **Normal functions have dynamic `this`**, meaning `this` depends on how they are called.
* **Arrow functions have lexical `this`**, meaning they use `this` from their surrounding context.
* JavaScript could theoretically have made all functions use lexical `this`, but normal functions were designed to allow `this` to change depending on the caller.
* Arrow functions provide a way to explicitly say: **"Don't create a new `this`; use the surrounding one."**
