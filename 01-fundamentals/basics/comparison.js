function comparison(a,b){
    return a.localeCompare(b);
}

console.log(comparison("shrijith", "shrijith"));
console.log(comparison("ravi", "shrijith")); 
console.log(comparison("shrijith", "ravi"));