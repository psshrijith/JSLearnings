class extractMaximum{
    method(str){
        const numbers = str.replace(/[^0-9]/g, '');
        console.log(numbers)
    }
}

const obj = new extractMaximum();
obj.method("100klh564abc365bg");