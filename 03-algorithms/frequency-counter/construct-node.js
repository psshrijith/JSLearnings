function constructNote(message, letters){

    const frequencyCounter1 = {};
    const frequencyCounter2 = {};

    for(const j of message){
        frequencyCounter1[j] = (frequencyCounter1[j]|| 0)+1;
    }

    for(const k of letters){
        frequencyCounter2[k] = (frequencyCounter2[k] || 0)+1;
    }

    for(const key in frequencyCounter1){
        if(frequencyCounter2[key] < frequencyCounter1[key] || !frequencyCounter2[key]){
            return false;
        }
    }
    return true;
}

// console.log(constructNote('skbjjjvnnd', 'fdjlkjfeburevjvnfnsjckjncjdnchbechbadhsd'))
console.log(constructNote("abc", 'ab'));