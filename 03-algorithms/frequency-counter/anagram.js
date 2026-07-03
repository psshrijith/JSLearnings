function anagram(str1, str2) {
    if (str1.length !== str2.length) {
        return false;
    }

    const frequencyCounter1 = {};
    const frequencyCounter2 = {};

    for (const char of str1) {
        frequencyCounter1[char] = (frequencyCounter1[char] || 0) + 1;
    }

    for (const char of str2) {
        frequencyCounter2[char] = (frequencyCounter2[char] || 0) + 1;
    }

    for (const key in frequencyCounter1) {
        if (frequencyCounter1[key] !== frequencyCounter2[key]) {
            return false;
        }
    }

    return true;
}

console.log(anagram('cinema', 'iceman'));
console.log(anagram('anagram', 'nagaram'));
console.log(anagram('abc', 'cba'));
