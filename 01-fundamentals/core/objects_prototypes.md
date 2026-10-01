# JavaScript — Objects, Prototypes, Classes, Destructuring & Modules

These are four important JavaScript concepts:

1. Objects & Prototypes
2. Classes
3. Destructuring
4. Modules

They are heavily used in modern JavaScript, TypeScript, React, Node.js, and most JavaScript applications.

---

# 1. Objects

## 1.1 What is an object?

An object is a collection of related data and behavior.

```js
const user = {
  name: "Shrijith",
  age: 25,
  city: "Bangalore"
};
```

The object contains:

```text
property → value
```

So:

```text
name → "Shrijith"
age  → 25
city → "Bangalore"
```

We can access properties using:

```js
console.log(user.name);
console.log(user.age);
```

Output:

```text
Shrijith
25
```

---

# 1.2 Object properties

Properties are key-value pairs.

```js
const user = {
  name: "Shrijith",
  age: 25
};
```

Here:

```text
name → property
"Shrijith" → value

age → property
25 → value
```

The key is usually written as a string, but JavaScript allows us to omit the quotes:

```js
const user = {
  name: "Shrijith"
};
```

This is effectively:

```js
const user = {
  "name": "Shrijith"
};
```

---

# 1.3 Accessing properties

There are two common ways.

## Dot notation

```js
console.log(user.name);
```

## Bracket notation

```js
console.log(user["name"]);
```

Both return:

```text
Shrijith
```

---

# 1.4 When to use bracket notation

Bracket notation becomes useful when the property name comes from a variable.

```js
const property = "name";

console.log(user[property]);
```

This gives:

```text
Shrijith
```

But:

```js
console.log(user.property);
```

looks for a property literally called `"property"`.

It does NOT use the value of the variable.

---

# 1.5 Adding properties

Objects are mutable by default.

```js
const user = {
  name: "Shrijith"
};

user.age = 25;
user.city = "Bangalore";
```

Now:

```js
console.log(user);
```

contains:

```js
{
  name: "Shrijith",
  age: 25,
  city: "Bangalore"
}
```

---

# 1.6 Modifying properties

```js
const user = {
  name: "Shrijith",
  age: 25
};

user.age = 26;
```

Now:

```js
user.age
```

is:

```text
26
```

---

# 1.7 Deleting properties

You can remove a property using `delete`.

```js
const user = {
  name: "Shrijith",
  age: 25
};

delete user.age;
```

Now:

```js
{
  name: "Shrijith"
}
```

In application code, however, it is often better to create a new object instead of mutating an existing object when working with state.

For example:

```js
const updatedUser = {
  ...user,
  age: 26
};
```

This becomes especially important in React.

---

# 1.8 Methods

Objects can contain functions.

```js
const user = {
  name: "Shrijith",

  sayHello() {
    console.log("Hello");
  }
};
```

`sayHello` is a method.

We can call it:

```js
user.sayHello();
```

---

# 1.9 `this` inside an object method

Consider:

```js
const user = {
  name: "Shrijith",

  sayHello() {
    console.log(`Hello ${this.name}`);
  }
};
```

When we call:

```js
user.sayHello();
```

`this` refers to the object calling the method:

```text
user.sayHello()
    ↑
  this
```

So:

```js
this.name
```

means:

```js
user.name
```

Therefore:

```text
Hello Shrijith
```

---

# 1.10 Objects can contain other objects

Objects can be nested.

```js
const user = {
  name: "Shrijith",

  address: {
    city: "Bangalore",
    country: "India"
  }
};
```

Access:

```js
console.log(user.address.city);
```

Output:

```text
Bangalore
```

---

# 1.11 Objects can contain arrays

```js
const user = {
  name: "Shrijith",
  skills: ["JavaScript", "React", "TypeScript"]
};
```

Access:

```js
console.log(user.skills[0]);
```

Output:

```text
JavaScript
```

---

# 1.12 Objects are reference values

This is an important JavaScript concept.

Consider:

```js
const user1 = {
  name: "Shrijith"
};

const user2 = user1;
```

Now both variables refer to the same object.

```text
user1 ──────┐
            ↓
        { name: "Shrijith" }
            ↑
user2 ──────┘
```

Therefore:

```js
user2.name = "Rahul";

console.log(user1.name);
```

Output:

```text
Rahul
```

Why?

Because there is only one object.

Both variables point to it.

---

# 1.13 Object comparison

Consider:

```js
const user1 = {
  name: "Shrijith"
};

const user2 = {
  name: "Shrijith"
};

console.log(user1 === user2);
```

Result:

```text
false
```

Even though their contents are identical, they are two different objects.

JavaScript compares object references, not their contents.

---

# 2. Prototypes

Prototypes are one of the most important and initially confusing parts of JavaScript.

The basic idea is:

> An object can inherit properties and methods from another object.

---

# 2.1 Why do prototypes exist?

Imagine we have:

```js
const user1 = {
  name: "Shrijith",

  sayHello() {
    console.log(`Hello ${this.name}`);
  }
};

const user2 = {
  name: "Rahul",

  sayHello() {
    console.log(`Hello ${this.name}`);
  }
};
```

We have duplicated the same method.

If we had 10,000 users, we don't want every object to store another copy of the same method.

JavaScript's prototype system allows objects to share behavior.

---

# 2.2 What is a prototype?

A prototype is another object that JavaScript can use when looking for properties or methods.

Imagine:

```text
user
  |
  ↓
prototype object
```

If JavaScript cannot find a property on `user`, it checks the prototype.

---

# 2.3 Prototype lookup

Consider:

```js
const user = {
  name: "Shrijith"
};
```

Now:

```js
console.log(user.name);
```

JavaScript first checks:

```text
Does user have "name"?
```

Yes.

So it returns:

```text
Shrijith
```

Now:

```js
console.log(user.toString());
```

Does `user` have `toString`?

No.

JavaScript then looks at its prototype.

Conceptually:

```text
user
 ↓
Object.prototype
 ↓
null
```

`Object.prototype` contains `toString`.

Therefore JavaScript finds it there.

---

# 2.4 The prototype chain

This search process is called the prototype chain.

Example:

```text
user
  ↓
Object.prototype
  ↓
null
```

Another example involving arrays:

```js
const numbers = [1, 2, 3];
```

Conceptually:

```text
numbers
   ↓
Array.prototype
   ↓
Object.prototype
   ↓
null
```

This explains why:

```js
numbers.map(...)
```

works.

The array itself does not necessarily contain its own `map` function.

JavaScript finds `map` through:

```text
numbers
   ↓
Array.prototype
   ↓
map()
```

---

# 2.5 `Object.prototype`

Almost all ordinary JavaScript objects eventually connect to:

```js
Object.prototype
```

For example:

```js
const user = {
  name: "Shrijith"
};
```

Conceptually:

```text
user
 ↓
Object.prototype
 ↓
null
```

Methods such as:

```js
toString()
hasOwnProperty()
```

come from the object prototype.

---

# 2.6 `Object.create()`

We can explicitly create an object with another object as its prototype.

```js
const personMethods = {
  sayHello() {
    console.log(`Hello ${this.name}`);
  }
};

const user = Object.create(personMethods);

user.name = "Shrijith";
```

Now:

```text
user
 |
 ↓
personMethods
 |
 └── sayHello()
```

Calling:

```js
user.sayHello();
```

works.

JavaScript doesn't find `sayHello` directly on `user`.

It finds it on `personMethods`.

---

# 2.7 `hasOwnProperty`

We can check whether a property belongs directly to an object.

```js
const personMethods = {
  sayHello() {}
};

const user = Object.create(personMethods);

user.name = "Shrijith";
```

Now:

```js
user.hasOwnProperty("name");
```

returns:

```text
true
```

But:

```js
user.hasOwnProperty("sayHello");
```

returns:

```text
false
```

Because `sayHello` comes from the prototype.

---

# 2.8 Constructor functions

Before the `class` syntax became common, JavaScript developers often used constructor functions.

```js
function User(name) {
  this.name = name;
}
```

We can add methods to its prototype:

```js
User.prototype.sayHello = function () {
  console.log(`Hello ${this.name}`);
};
```

Now:

```js
const user1 = new User("Shrijith");
const user2 = new User("Rahul");
```

Both objects can use:

```js
user1.sayHello();
user2.sayHello();
```

The important part is that the method is shared:

```text
user1 ──┐
        │
        ├──→ User.prototype
        │        │
user2 ──┘        └── sayHello()
```

---

# 2.9 What does `new` do?

This is extremely important.

When you write:

```js
const user = new User("Shrijith");
```

JavaScript roughly performs these steps:

### Step 1 — Create a new object

```text
{}
```

### Step 2 — Connect it to `User.prototype`

```text
new object
    ↓
User.prototype
```

### Step 3 — Call `User`

```js
User("Shrijith");
```

with `this` referring to the new object.

So:

```js
this.name = name;
```

creates:

```js
{
  name: "Shrijith"
}
```

### Step 4 — Return the object

The resulting object is assigned to:

```js
user
```

---

# 3. Classes

Classes provide a cleaner syntax for creating objects and defining shared behavior.

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello ${this.name}`);
  }
}
```

Create an object:

```js
const user = new User("Shrijith");
```

Call its method:

```js
user.sayHello();
```

---

# 3.1 Constructor

The constructor runs when a new object is created.

```js
class User {
  constructor(name) {
    this.name = name;
  }
}
```

When:

```js
const user = new User("Shrijith");
```

the constructor receives:

```text
name = "Shrijith"
```

and:

```js
this.name = name;
```

creates the property.

---

# 3.2 Instance

An object created from a class is called an instance.

```js
const user = new User("Shrijith");
```

Here:

```text
User
 ↓
class

user
 ↓
instance of User
```

We can check:

```js
console.log(user instanceof User);
```

Output:

```text
true
```

---

# 3.3 Class methods

Methods are defined inside the class:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello ${this.name}`);
  }

  changeName(newName) {
    this.name = newName;
  }
}
```

Use:

```js
const user = new User("Shrijith");

user.sayHello();

user.changeName("Rahul");

user.sayHello();
```

---

# 3.4 Where are class methods stored?

Consider:

```js
class User {
  sayHello() {
    console.log("Hello");
  }
}
```

A common misconception is:

```text
user
 ├── sayHello
```

But conceptually it is:

```text
user
 ↓
User.prototype
 ↓
sayHello()
```

This is because JavaScript classes still use the prototype system.

Therefore:

```text
Classes
   ↓
Prototype-based system
```

---

# 3.5 Class inheritance

One class can extend another.

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello ${this.name}`);
  }
}
```

Create a child class:

```js
class Developer extends User {
  writeCode() {
    console.log("Writing code...");
  }
}
```

Now:

```js
const developer = new Developer("Shrijith");
```

The developer can use:

```js
developer.sayHello();
developer.writeCode();
```

---

# 3.6 Prototype chain with classes

The relationship is conceptually:

```text
developer
    ↓
Developer.prototype
    ↓
User.prototype
    ↓
Object.prototype
    ↓
null
```

When we call:

```js
developer.sayHello();
```

JavaScript searches:

```text
developer
    ↓
Developer.prototype
    ↓
User.prototype
    ↓
sayHello found!
```

---

# 3.7 `super`

`super` allows the child class to access the parent class.

```js
class User {
  constructor(name) {
    this.name = name;
  }
}

class Developer extends User {
  constructor(name, language) {
    super(name);

    this.language = language;
  }
}
```

This:

```js
super(name);
```

calls the parent constructor.

Without it, a derived class constructor cannot use `this` before the parent constructor has been called.

---

# 3.8 Overriding methods

A child class can provide its own implementation of a method.

```js
class User {
  sayHello() {
    console.log("Hello user");
  }
}

class Developer extends User {
  sayHello() {
    console.log("Hello developer");
  }
}
```

Now:

```js
const developer = new Developer();

developer.sayHello();
```

Output:

```text
Hello developer
```

The child method overrides the parent method.

---

# 3.9 Calling the parent method with `super`

We can still call the parent implementation.

```js
class User {
  sayHello() {
    console.log("Hello user");
  }
}

class Developer extends User {
  sayHello() {
    super.sayHello();
    console.log("Hello developer");
  }
}
```

Output:

```text
Hello user
Hello developer
```

---

# 3.10 Private fields

Modern JavaScript supports private class fields using `#`.

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}
```

You cannot directly do:

```js
account.#balance;
```

outside the class.

This provides stronger encapsulation.

---

# 3.11 Static methods

A static method belongs to the class itself rather than an instance.

```js
class MathUtils {
  static add(a, b) {
    return a + b;
  }
}
```

Call:

```js
MathUtils.add(10, 20);
```

Not:

```js
const math = new MathUtils();

math.add(10, 20);
```

Static methods are useful for functionality that doesn't require an instance.

---

# 3.12 Classes vs prototypes

Important:

```js
class User {}
```

does not replace prototypes.

JavaScript is still fundamentally prototype-based.

Classes provide a more convenient syntax for working with the prototype system.

Conceptually:

```text
class User
     ↓
User.prototype
     ↓
shared methods
```

---

# 4. Destructuring

Destructuring allows us to extract values from objects and arrays into variables.

---

# 4.1 Object destructuring

Without destructuring:

```js
const user = {
  name: "Shrijith",
  age: 25
};

const name = user.name;
const age = user.age;
```

With destructuring:

```js
const { name, age } = user;
```

Now:

```js
console.log(name);
console.log(age);
```

---

# 4.2 How object destructuring works

This:

```js
const { name, age } = user;
```

means approximately:

```js
const name = user.name;
const age = user.age;
```

The names inside `{}` correspond to property names.

---

# 4.3 Renaming during destructuring

Suppose:

```js
const user = {
  name: "Shrijith"
};
```

We want the variable to be called `userName`.

```js
const { name: userName } = user;
```

Now:

```js
console.log(userName);
```

returns:

```text
Shrijith
```

The syntax means:

```text
object property → variable name

name → userName
```

---

# 4.4 Default values

If a property doesn't exist:

```js
const user = {
  name: "Shrijith"
};

const { name, age = 25 } = user;
```

Then:

```js
age
```

will be:

```text
25
```

The default is used only when the property is `undefined`.

---

# 4.5 Nested object destructuring

Consider:

```js
const user = {
  name: "Shrijith",

  address: {
    city: "Bangalore",
    country: "India"
  }
};
```

We can write:

```js
const {
  name,
  address: {
    city,
    country
  }
} = user;
```

Now:

```js
console.log(city);
```

returns:

```text
Bangalore
```

---

# 4.6 Array destructuring

Arrays use position instead of property names.

```js
const numbers = [10, 20, 30];
```

We can write:

```js
const [first, second, third] = numbers;
```

Result:

```text
first  → 10
second → 20
third  → 30
```

---

# 4.7 Skipping array elements

```js
const numbers = [10, 20, 30];

const [first, , third] = numbers;
```

Result:

```text
first → 10
third → 30
```

The second element is skipped.

---

# 4.8 Rest syntax

Consider:

```js
const numbers = [10, 20, 30, 40];
```

We can do:

```js
const [first, ...rest] = numbers;
```

Result:

```js
first = 10;

rest = [20, 30, 40];
```

`...rest` collects the remaining values.

---

# 4.9 Rest with objects

The same concept works with objects.

```js
const user = {
  name: "Shrijith",
  age: 25,
  city: "Bangalore"
};

const { name, ...otherDetails } = user;
```

Result:

```js
name = "Shrijith";

otherDetails = {
  age: 25,
  city: "Bangalore"
};
```

---

# 4.10 Destructuring function parameters

This is extremely common in React.

Instead of:

```js
function printUser(user) {
  console.log(user.name);
  console.log(user.age);
}
```

we can write:

```js
function printUser({ name, age }) {
  console.log(name);
  console.log(age);
}
```

Call:

```js
printUser({
  name: "Shrijith",
  age: 25
});
```

---

# 4.11 React props and destructuring

You will see this constantly in React.

```jsx
function UserCard({ name, age }) {
  return (
    <div>
      {name} - {age}
    </div>
  );
}
```

React passes a props object:

```js
{
  name: "Shrijith",
  age: 25
}
```

The component destructures it:

```js
{ name, age }
```

---

# 4.12 Destructuring return values

Functions often return arrays.

For example:

```js
function getUser() {
  return ["Shrijith", 25];
}
```

We can do:

```js
const [name, age] = getUser();
```

This pattern is especially important in React.

For example:

```js
const [count, setCount] = useState(0);
```

`useState()` returns an array containing two values:

```text
[
  currentState,
  functionToUpdateState
]
```

Array destructuring extracts them:

```text
count       ← first value
setCount    ← second value
```

---

# 4.13 Swapping variables

Destructuring gives us a clean way to swap variables.

```js
let a = 10;
let b = 20;

[a, b] = [b, a];
```

Now:

```text
a = 20
b = 10
```

---

# 5. Modules

Modules allow us to split JavaScript code across multiple files.

Without modules, a large application can become difficult to maintain.

Instead of:

```text
app.js
10000 lines
```

we can have:

```text
src/
├── users.js
├── tasks.js
├── api.js
├── auth.js
└── utils.js
```

Each file can contain a separate module.

---

# 5.1 Why modules?

Modules provide:

* Organization
* Reusability
* Encapsulation
* Dependency management
* Better maintainability

---

# 5.2 Export

Suppose we have:

```js
// math.js

export const PI = 3.14;

export function add(a, b) {
  return a + b;
}
```

We have exported:

```text
PI
add
```

---

# 5.3 Import

Another file can import them.

```js
// app.js

import { PI, add } from "./math.js";

console.log(PI);

console.log(add(10, 20));
```

The relationship is:

```text
math.js
   │
   │ export
   ↓
app.js
   │
   │ import
   ↓
uses PI and add
```

---

# 5.4 Named exports

This is a named export:

```js
export const PI = 3.14;

export function add(a, b) {
  return a + b;
}
```

Import:

```js
import { PI, add } from "./math.js";
```

The names need to correspond to the exported bindings.

---

# 5.5 Renaming named imports

You can rename an imported value:

```js
import { add as sum } from "./math.js";
```

Now:

```js
sum(10, 20);
```

works.

---

# 5.6 Default exports

A module can also have a default export.

```js
// User.js

export default class User {
  constructor(name) {
    this.name = name;
  }
}
```

Import:

```js
import User from "./User.js";
```

Notice there are no `{}`.

---

# 5.7 Named vs default exports

Named:

```js
export function add() {}
```

Import:

```js
import { add } from "./math.js";
```

Default:

```js
export default function add() {}
```

Import:

```js
import add from "./math.js";
```

Main difference:

```text
Named export
    ↓
import { name }

Default export
    ↓
import name
```

---

# 5.8 Multiple named exports

A module can have many named exports.

```js
export const PI = 3.14;

export function add() {}

export function subtract() {}

export function multiply() {}
```

Then:

```js
import {
  PI,
  add,
  subtract,
  multiply
} from "./math.js";
```

---

# 5.9 Only one default export

A module can have only one default export.

Valid:

```js
export default User;
```

Not:

```js
export default User;
export default Task;
```

If you need multiple exports, use named exports.

---

# 5.10 Exporting at the bottom

You can export values at the end of the file.

```js
const PI = 3.14;

function add(a, b) {
  return a + b;
}

export {
  PI,
  add
};
```

This is equivalent to exporting them where they're declared.

---

# 5.11 Module scope

Modules have their own scope.

Suppose:

```js
// math.js

const secret = 123;

export function add(a, b) {
  return a + b;
}
```

Another module cannot access:

```js
secret
```

unless it is exported.

```text
math.js
 ├── secret
 └── add
       ↓
    exported
```

Only `add` is exposed to other modules.

This is an important form of encapsulation.

---

# 5.12 Modules are automatically strict mode

JavaScript modules automatically use strict mode.

You don't need to write:

```js
"use strict";
```

inside an ES module.

---

# 5.13 Importing everything

You can import all named exports under a namespace.

```js
import * as math from "./math.js";
```

Then:

```js
math.add(10, 20);

math.subtract(20, 10);
```

The imported object is called a namespace object.

---

# 5.14 Side-effect imports

Sometimes a module doesn't export anything that you need.

You may simply import it for its side effects.

```js
import "./styles.css";
```

The purpose is to execute/load the module.

This is common in frontend applications.

---

# 5.15 Modules and dependency relationships

Consider:

```js
// api.js

export function fetchTasks() {}
```

Then:

```js
// TaskList.js

import { fetchTasks } from "./api.js";
```

The dependency relationship is:

```text
TaskList.js
     │
     │ depends on
     ↓
   api.js
```

A module should generally depend on what it actually needs.

---

# 6. Putting Everything Together

Let's combine objects, prototypes, classes, destructuring, and modules.

## User.js

```js
export class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Hello ${this.name}`);
  }
}
```

Here we have:

```text
class
  ↓
User
```

When an instance is created:

```js
const user = new User("Shrijith", 25);
```

we have an object:

```js
{
  name: "Shrijith",
  age: 25
}
```

And:

```js
sayHello()
```

is available through:

```text
user
 ↓
User.prototype
 ↓
sayHello()
```

---

## app.js

```js
import { User } from "./User.js";

const user = new User("Shrijith", 25);

const { name, age } = user;

console.log(name);
console.log(age);

user.sayHello();
```

Here we are using all four concepts.

### Object

```js
user
```

is an object.

### Prototype

```js
user.sayHello();
```

finds the method through the prototype chain.

### Class

```js
class User
```

defines the structure and behavior.

### Destructuring

```js
const { name, age } = user;
```

extracts properties.

### Module

```js
export class User
```

and:

```js
import { User }
```

allow the class to be shared between files.

---

# 7. A Realistic Example

Imagine a task management application.

## task.js

```js
export class Task {
  constructor(title, priority) {
    this.title = title;
    this.priority = priority;
    this.completed = false;
  }

  complete() {
    this.completed = true;
  }

  getSummary() {
    return `${this.title} - ${this.priority}`;
  }
}
```

Then:

```js
// app.js

import { Task } from "./task.js";

const task = new Task(
  "Learn JavaScript",
  "high"
);
```

The object contains:

```js
{
  title: "Learn JavaScript",
  priority: "high",
  completed: false
}
```

The methods are available through:

```text
task
 ↓
Task.prototype
 ↓
complete()
getSummary()
```

Now destructuring:

```js
const {
  title,
  priority,
  completed
} = task;
```

We can access:

```js
console.log(title);
console.log(priority);
console.log(completed);
```

And:

```js
task.complete();
```

changes:

```text
completed
false
  ↓
true
```

This is very similar to patterns you'll encounter when building something like TaskFlow.

---

# 8. Common Mistakes

## Mistake 1 — Thinking classes are completely separate from prototypes

Incorrect:

```text
Classes ≠ prototypes
```

Better mental model:

```text
Classes
   ↓
use JavaScript's prototype system
```

---

## Mistake 2 — Thinking every object gets its own class method

Given:

```js
class User {
  sayHello() {}
}
```

Don't think:

```text
user1 → own sayHello
user2 → own sayHello
```

The method is normally on:

```text
User.prototype
```

and shared by instances.

---

## Mistake 3 — Confusing object destructuring with array destructuring

Object:

```js
const { name } = user;
```

uses property names.

Array:

```js
const [first] = numbers;
```

uses position.

Remember:

```text
Object → property name
Array  → position
```

---

## Mistake 4 — Forgetting that objects are reference values

```js
const user1 = {
  name: "Shrijith"
};

const user2 = user1;

user2.name = "Rahul";
```

Now:

```js
user1.name
```

is also:

```text
Rahul
```

because both variables refer to the same object.

---

## Mistake 5 — Confusing default and named imports

Named:

```js
export const name = "Shrijith";
```

Import:

```js
import { name } from "./user.js";
```

Default:

```js
export default name;
```

Import:

```js
import name from "./user.js";
```

---

# 9. How These Concepts Appear in React

These concepts become much more useful once you connect them to React.

## Destructuring

You'll constantly see:

```jsx
function TaskCard({ title, priority }) {
  return (
    <div>
      {title} - {priority}
    </div>
  );
}
```

---

## Modules

Almost every React file uses modules:

```js
import React from "react";
import TaskCard from "./TaskCard";
```

And exports:

```js
export default TaskCard;
```

or:

```js
export { TaskCard };
```

---

## Objects

React applications constantly represent data as objects:

```js
const task = {
  id: 1,
  title: "Learn JavaScript",
  priority: "high",
  completed: false
};
```

---

## Prototypes

You might not manually write:

```js
Array.prototype
```

very often.

But you're using the prototype system constantly:

```js
tasks.map(...)
tasks.filter(...)
tasks.find(...)
```

For example:

```js
tasks.map(task => task.title);
```

`map` comes through the array prototype.

---

## Classes

Modern React mostly uses function components:

```jsx
function TaskCard() {
  return <div>Task</div>;
}
```

rather than class components.

However, classes are still important JavaScript knowledge because you'll encounter them in libraries, older React code, Node.js code, and object-oriented codebases.

---

# 10. The Big Picture

You can think about the concepts like this:

```text
                    JavaScript
                        │
          ┌─────────────┼─────────────┐
          ↓             ↓             ↓
       Objects       Functions      Modules
          │
          ↓
      Prototypes
          │
          ↓
       Classes
```

Destructuring works with the values produced by these systems:

```text
Objects ──────┐
              │
Arrays ───────┼──→ Destructuring
              │
Function args ┘
```

---

# 11. Mental Models

Don't try to memorize every detail.

Remember these simple definitions.

## Object

> A container that holds related data and behavior.

```js
const user = {
  name: "Shrijith",
  age: 25
};
```

---

## Prototype

> An object JavaScript looks at when it cannot find a property on the current object.

```text
object
   ↓
prototype
   ↓
prototype's prototype
   ↓
null
```

---

## Class

> A convenient syntax for creating objects and defining shared behavior using JavaScript's prototype system.

```js
class User {
  sayHello() {}
}
```

---

## Destructuring

> A convenient syntax for extracting values from objects and arrays.

```js
const { name } = user;

const [first, second] = numbers;
```

---

## Module

> A JavaScript file with its own scope that can explicitly share code using `export` and consume code using `import`.

```js
export function add() {}
```

```js
import { add } from "./math.js";
```

---

# 12. Industry Standard

In modern JavaScript and TypeScript applications:

### Prefer objects for data

```js
const task = {
  title: "Learn JS",
  completed: false
};
```

### Understand prototypes, but don't manipulate them unnecessarily

You should understand:

```js
Object.prototype
Array.prototype
User.prototype
```

but most application code doesn't need manual prototype manipulation.

Avoid unnecessarily doing things like:

```js
User.prototype.someMethod = ...
```

when a class or object composition can express the design more clearly.

---

### Use classes when they actually fit the problem

Classes can be useful for:

* Domain models
* Complex stateful objects
* Libraries
* Object-oriented designs
* Encapsulation

Don't automatically use classes for everything.

Modern JavaScript often uses:

```text
functions
+
objects
+
modules
```

instead.

---

### Use destructuring for readability

Common:

```js
const { data, error } = response;
```

and:

```js
function TaskCard({ title, priority }) {}
```

But don't destructure so aggressively that the code becomes difficult to understand.

Readable code is more important than using syntax just because it is available.

---

### Use ES modules

Prefer:

```js
import { something } from "./module.js";
```

and:

```js
export { something };
```

Modern frontend and Node.js applications commonly use ES modules.

---

# 13. Takeaways

The five most important things to remember are:

```text
1. Objects
   ↓
   Store related data and behavior.
```

```text
2. Prototypes
   ↓
   Provide inheritance and shared behavior.
```

```text
3. Classes
   ↓
   Provide convenient syntax for creating objects
   and working with prototypes.
```

```text
4. Destructuring
   ↓
   Extract values from objects and arrays.
```

```text
5. Modules
   ↓
   Organize code into separate files and
   explicitly share functionality.
```

The most important relationship is:

```text
             Object
                │
                ↓
            Prototype
                │
                ↓
             Class
                │
                ↓
        Objects created
        from that class
```

And modules allow us to organize all of that:

```text
                 Application
                     │
        ┌────────────┼────────────┐
        ↓            ↓            ↓
     User.js      Task.js      api.js
        │            │            │
      class        class       functions
        │            │            │
        └────────────┼────────────┘
                     ↓
                  app.js
                     │
                imports them
```

