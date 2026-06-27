let i = 1
let j = 0
const range = 15
for(let v=0;v<range;v++){
    const nextNumber = i + j
    console.log(j);
    j = i;
    i = nextNumber;
}
