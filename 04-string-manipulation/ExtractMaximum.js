class extractMaximum{
    method(str){
        let numbers = str.replace(/[^0-9]/g, '');
        console.log(numbers)
    }
}

let obj = new extractMaximum();
obj.method("100klh564abc365bg");