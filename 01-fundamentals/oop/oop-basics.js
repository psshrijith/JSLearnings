class A{
    a  = 90;
}

class B extends A{
    mymethod(){
        console.log("Hello world")
    }
}

let obj = new A();
let obj1 = new B()
obj1.mymethod();
console.log(obj.a)