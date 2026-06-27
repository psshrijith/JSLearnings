class A{
    a  = 90;
}

class B extends A{
    mymethod(){
        console.log("Hello world")
    }
}

const obj = new A();
const obj1 = new B()
obj1.mymethod();
console.log(obj.a)