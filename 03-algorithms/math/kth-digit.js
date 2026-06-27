/*
Input:
A = 3
B = 3
K = 1
Output: 7

Explanation:
3 ** 3 = 27 and 1st digit from right is 7
*/


class Solution{
    kthDigit(A, B, K){
        const result= A**B;
        const resultS = result.toString();
        return resultS[resultS.length-K];
    }
}

const kDigit = new Solution();
console.log(kDigit.kthDigit(3,3,1));