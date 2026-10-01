# Lexical Environment vs Closure

These two concepts are closely related, but they are **not the same thing**.

A simple way to remember them:

> **Lexical Environment = the environment where variables and functions are stored and connected based on where the code is written.**

> **Closure = when a function retains access to its surrounding lexical environment even after the outer function has finished executing.**

---

# 1. Lexical Environment

Consider this example:

```js
function outer() {
  const name = "Shrijith";

  function inner() {
    console.log(name);
  }

  inner();
}

outer();
```

When `outer()` runs, JavaScript needs an environment to keep track of its variables and functions.

Conceptually:

```text
outer's Lexical Environment

┌─────────────────────────┐
│ name  → "Shrijith"      │
│ inner → function        │
└─────────────────────────┘
```

The important thing is that `inner()` was **written inside `outer()`**.

Therefore, `inner()` can access variables from `outer()`.

```text
Global Environment
        │
        ▼
┌─────────────────────────┐
│ outer                   │
└─────────────────────────┘
        │
        ▼
┌─────────────────────────┐
│ outer's Lexical Env     │
│                         │
│ name → "Shrijith"       │
│ inner → function        │
└─────────────────────────┘
        │
        ▼
     inner()
        │
        │ can access
        ▼
      name
```

This is **lexical scoping**.

The relationship is determined by **where the code is written**, not by where the function is called.

---

# 2. Now Let's Create a Closure

Consider this:

```js
function outer() {
  const name = "Shrijith";

  function inner() {
    console.log(name);
  }

  return inner;
}

const fn = outer();

fn();
```

Something interesting happens here.

First:

```js
const fn = outer();
```

`outer()` executes.

Inside `outer()`:

```js
const name = "Shrijith";
```

is created.

Then:

```js
return inner;
```

returns the `inner` function.

So now:

```text
fn → inner function
```

Then `outer()` finishes.

Normally, you might think:

```text
outer()
   ↓
execution finishes
   ↓
name is gone
```

But `fn` still needs access to:

```js
name
```

So the function retains access to the surrounding lexical environment.

This is a **closure**.

---

# 3. Visualizing the Closure

```text
                 outer()
                   │
                   ▼
        ┌─────────────────────┐
        │ Lexical Environment │
        │                     │
        │ name → "Shrijith"   │
        │                     │
        │ inner → function ───┼─────┐
        └─────────────────────┘     │
                                    │
                                    ▼
                              inner function
                                    │
                                    │ remembers/accesses
                                    ▼
                                  name
                                    │
                                    ▼
                               "Shrijith"


outer() finishes
       │
       ▼
inner function still exists
       │
       ▼
inner still has access to `name`
       │
       ▼
       └──────────────→ Closure
```

---

# 4. What Exactly Is the Closure?

The closure is **not simply the variable**:

```js
name
```

And it is not simply the lexical environment.

The important idea is:

```text
Function
   +
Access to surrounding lexical environment
   =
Closure
```

So:

```js
function outer() {
  const name = "Shrijith";

  return function inner() {
    console.log(name);
  };
}
```

The returned `inner` function forms a closure over the environment containing `name`.

---

# 5. A Better Example: Counter

The counter example makes closures much easier to understand.

```js
function createCounter() {
  let count = 0;

  return function () {
    count++;

    console.log(count);
  };
}

const counter = createCounter();

counter();
counter();
counter();
```

Output:

```text
1
2
3
```

Why does this work?

`createCounter()` has already finished executing.

Yet:

```js
counter();
```

can still access:

```js
count
```

because the returned function has a closure over the lexical environment where `count` exists.

---

# 6. Visualizing the Counter

When this runs:

```js
const counter = createCounter();
```

we can think of it as:

```text
createCounter()
      │
      ▼
┌──────────────────────┐
│ Lexical Environment  │
│                      │
│ count → 0            │
└──────────────────────┘
          │
          │ closure
          ▼
   returned function
          │
          ▼
       counter
```

Then:

```js
counter();
```

changes the binding:

```text
count → 0
   ↓
count → 1
```

Next:

```js
counter();
```

changes it again:

```text
count → 1
   ↓
count → 2
```

And:

```js
counter();
```

changes it again:

```text
count → 2
   ↓
count → 3
```

The function is retaining access to the **same `count` binding**.

---

# 7. Important: It Doesn't Simply Remember a Copy of the Value

This is an important distinction.

It's tempting to think:

> "The closure remembers that `count` was 0."

That's not quite correct.

Instead, think:

> **The closure retains access to the `count` binding.**

That's why this works:

```js
function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

The value changes because the function still has access to the same variable.

---

# 8. Lexical Environment vs Closure

| Concept             | Meaning                                                                       |
| ------------------- | ----------------------------------------------------------------------------- |
| Lexical Environment | Environment that stores variable/function bindings and connects nested scopes |
| Lexical Scope       | Rules that determine variable accessibility based on where code is written    |
| Closure             | A function retaining access to its surrounding lexical environment            |
| Outer Function      | Function that creates the environment containing variables                    |
| Inner Function      | Function that can access variables from the outer environment                 |

---

# 9. The Simplest Mental Model

Remember this:

```text
LEXICAL ENVIRONMENT

"Where are my variables and functions,
and what outer environment can I access?"

             ↓

CLOSURE

"Does this function still have access
to that environment after the outer
function has finished?"
```

Or:

```text
Lexical Environment
        ↓
Creates the variable relationship

Closure
        ↓
Preserves access to that relationship
for a function
```

---

# 10. One Final Example

```js
function greet() {
  const name = "Shrijith";

  return function () {
    console.log(`Hello ${name}`);
  };
}

const sayHello = greet();

sayHello();
```

Output:

```text
Hello Shrijith
```

### Step 1

`greet()` starts:

```text
greet()
  │
  └── name → "Shrijith"
```

### Step 2

The inner function is created:

```text
inner function
      │
      └── needs `name`
```

### Step 3

The inner function is returned:

```js
const sayHello = greet();
```

Now:

```text
sayHello
   │
   ▼
inner function
   │
   │ closure
   ▼
name → "Shrijith"
```

### Step 4

`greet()` finishes.

But:

```text
sayHello
   │
   ▼
still has access to
   │
   ▼
name
```

Therefore:

```js
sayHello();
```

still prints:

```text
Hello Shrijith
```

---

# Takeaways

```text
1. Lexical scope
   → determined by where code is written.

2. Lexical environment
   → keeps track of variables/functions and their
     relationship with outer environments.

3. Closure
   → a function retains access to its surrounding
     lexical environment.

4. The outer function can finish executing,
   → but the inner function can still access
     variables from that environment.

5. A closure does not simply remember a copy
   of a value.
   → It retains access to the variable/binding.
```

### One sentence to remember

> **A lexical environment provides the variables; a closure allows a function to keep accessing those variables after the surrounding function has finished.**
