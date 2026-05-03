// Function that returns a promise to simulate an asynchronous operation
function simulateAsyncOperation() {
    return new Promise((resolve, reject) => {
      // Simulating an asynchronous operation (e.g., fetching data from a server)
      setTimeout(() => {
        const success = true; // Simulating success, set to false to simulate an error
        if (success) {
          resolve('Operation successful');
        } else {
          reject(new Error('Operation failed'));
        }
      }, 1000); // Simulating a 1-second delay
    });
  }
  
  // Using the promise
  simulateAsyncOperation()
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
  
