class Student{
    constructor(firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }

    name(){
        return this.firstName+this.lastName;
    }

    static method(){
        return "hello";
    }
}

const obj1 = new Student("ram", "gopal");
console.log(obj1.name());
console.log(Student.method());
