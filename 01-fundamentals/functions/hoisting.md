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

The function value is assigned only when JavaScript reaches this line:

```js
const sayHello = function () {};
```

---

# 3. The Important Difference

Compare:

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

> The variable binding is created during the creation phase, but the function value is assigned during execution.

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

Arrow functions behave the same way in this situation:

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

# 10. Easy Mental Model

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
Available before execution reaches it
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

---

# 11. Example

```js
console.log(add(2, 3));

function add(a, b) {
  return a + b;
}
```

Output:

```text
5
```

Because `add` is a function declaration.

Now:

```js
console.log(add(2, 3));

const add = function (a, b) {
  return a + b;
};
```

Output:

```text
ReferenceError
```

Because `add` is a `const` binding that has not been initialized when the first line executes.

---

# Key Takeaways

* **Function declarations are initialized during the creation phase.**
* Therefore, they can be called before they appear in the code.
* **Function expressions are assigned to variables during execution.**
* `const` and `let` variables are created but remain **uninitialized** until their declaration is executed.
* `var` variables are initialized with `undefined`.
* Arrow functions are also function expressions.
* Saying "function expressions are not hoisted" is a simplified explanation. More precisely, the **binding exists, but the function value is not assigned until execution reaches the assignment**.
