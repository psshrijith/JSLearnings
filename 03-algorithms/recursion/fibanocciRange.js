function fibanocciRange(n) {
    if (n <= 1) {
        return n;
    }
    return fibanocciRange(n - 1) + fibanocciRange(n - 2);
}

console.log(fibanocciRange(6)); // Output: 8