new Promise
  -> Creates a promise that represents a future value. 3 states: pending, rejected, fullfilled.

.then
  -> executes a callback with the value sent from calling resolve

.catch
  -> executes a callback with the value sent from calling reject

.finally
  -> executes callback no matter rejected or resolved.

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
  -> execute a callback for each iterable

.race
  -> return the first promise resolved. qualifies rejected result

.any
  -> same as race but does not qualify rejected result

.some
  -> returns the first n promise(s) resolved as an array.

.promisify
  -> converts a SINGLE callback taking function into a promise returning function. It does not alter the original function

.promisifyAll
  -> takes an object full of functions and adds a "Promise" version with the Async suffix(default). Does not change the original functions but instead add new ones.

.fromCallback
  -> promisify libraries that don't expose prototypes for promisification

.asCallback
  -> register a node-style callback(err, res) on a promise

.tap
  -> same with finally but the difference is it's not NOT CALLED on reject

.tapCatch
  -> same with finally but the difference is it's CALLED on reject

.get
  -> convenient way to get a property (object) or index (array) of a promise. Returns as promise

.return or .thenReturn
  -> enables to return a value already bound as this method is called

.using
  -> make sure that no matter what, the specified disposer will be called when the promise returned by the callback passed to using has settled

.disposer
  ->  method that cleans up a resource when using Promise.using
