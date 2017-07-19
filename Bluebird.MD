new Promise
  -> Creates a promise that represents a future value. 3 states: pending, rejected, fullfilled.

.then
  -> executes a callback with the value sent from calling resolve

.catch
  -> executes a callback with the value sent from calling reject

.try or .attempt
  -> returns a Promise. rejects the promise if errror is thrown

.method
  -> Returns a function that wraps the given function. The new function will always return a promise that is fulfilled with the original functions return values or rejected with thrown exceptions from the original function. This method is convenient when a function can sometimes return synchronously or throw synchronously.

.all
  -> the next promise depends on multiple promises resolving. accepts array of promises

.props
  -> same with all but accepts dictionary of promises


.spread
  -> flatten the returning array

.map
  -> map an array to promises. accepts an object that has concurrency property. Concurrency specifies the number of async executions

.mapSeries
-> .map with concurrency : 1

.each

.promisify
  -> converts a SINGLE callback taking function into a promise returning function. It does not alter the original function

.promisifyAll
  -> takes an object full of functions and adds a "Promise" version with the Async suffix(default). Does not change the original functions but instead add new ones.
