class Student{
    constructor(firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }

    name(){
        return this.firstName+this.lastName;
    }
}

const obj1 = new Student("ram", "gopal");
console.log(obj1.name());
