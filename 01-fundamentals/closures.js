function func1(msg){
    message = msg;

    function func2(){
        console.log(message);
    }

    return func2();
}

func1("Hai");