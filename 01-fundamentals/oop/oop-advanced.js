class A{
    constructor (a, b){
        this.a  = a;
        this.b = b;
    }

    method(){
        console.log(this.a);
        console.log(this.b);
    }
}

const a = new A(56,56);
a.method()