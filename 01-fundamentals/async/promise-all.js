const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(3), 1000);
});
const promise4 = new Promise((resolve, reject) => {
  setTimeout(() => reject('Error occurred'), 500);
});

Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log('All promises fulfilled:', values); // Output: [1, 2, 3]
  })
  .catch((error) => {
    console.error('One of the promises rejected:', error);
  });

Promise.all([promise1, promise2, promise3, promise4])
  .then((values) => {
    console.log('All promises fulfilled:', values); // This line won't execute
  })
  .catch((error) => {
    console.error('One of the promises rejected p:', error); // Output: One of the promises rejected: Error occurred
  });
