function constructNote(message, letters){

    let frequencyCounter1 = {};
    let frequencyCounter2 = {};

    for(let j of message){
        frequencyCounter1[j] = (frequencyCounter1[j]|| 0)+1;
    }

    for(let k of letters){
        frequencyCounter2[k] = (frequencyCounter2[k] || 0)+1;
    }

    for(let key in frequencyCounter1){
        if(frequencyCounter2[key] < frequencyCounter1[key] || !frequencyCounter2[key]){
            return false;
        }
    }
    return true;
}

// console.log(constructNote('skbjjjvnnd', 'fdjlkjfeburevjvnfnsjckjncjdnchbechbadhsd'))
console.log(constructNote("abc", 'ab'));