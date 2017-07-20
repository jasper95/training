new Promise(resolve, reject, onCancel)
  -> Creates a promise that represents a future value. 3 states: pending, rejected, fullfilled.

.then(fn)
  -> executes a callback with the value sent from calling resolve

.catch(fn)
  -> executes a callback with the value sent from calling reject

.error(fn)
  -> Like .catch but instead of catching all types of exceptions, it only catches operational errors. AggregateError and OperationalError

.bind(thisArg)
  -> Create a promise that follows this promise or in the static method is resolved with the given value, but is bound to the given thisArg value

.finally -> Promise
  -> executes callback no matter rejected or resolved.

Promise.try(fn) or Promise.attempt(fn)
  -> returns a Promise. rejects the promise if errror is thrown

Promise.method(fn) -> fn
  -> Returns a function that wraps the given function. The new function will always return a promise that is fulfilled with the original functions return values or rejected with thrown exceptions from the original function. This method is convenient when a function can sometimes return synchronously or throw synchronously.

Promise.resolve(val) -> Promise
  -> returns a promise resolved with the given value

Promise.reject(error) -> Promise
  -> returns a promise that is rejected with the given error

Promise.promisify(nodeFn, {multiArgs:boolean, context: ctx}) -> fn
  -> converts a SINGLE callback taking function into a promise returning function. It does not alter the original function. If you pass a context, the nodeFunction will be called as a method on the context.

Promise.promisifyAll(obj, {suffix: Str, multiArgs: boolean, filter: boolean fn, promisifier: fn}) -> Obj
  -> takes an object full of functions and adds a "Promise" version with the Async suffix(default). Does not change the original functions but instead add new ones.

Promise.fromCallback(fn, {multiArgs: boolean}) -> Promise
  -> promisify libraries that don't expose prototypes for promisification

.asCallback(fn, {spread : boolean}) -> this
  -> register a node-style callback(err, res) on a promise

.all([Promise], fn) -> [Promise]
  -> the next promise depends on multiple promises resolving. accepts array of promises

.props({a : Promise..}) -> {b : Promise}
  -> same with all but accepts dictionary of promises

.spread(fn(a, ...))
  -> flatten the returning array

.map([], fn, {concurrency: n}) -> [Promise]
  -> map an array to promises. accepts an object that has concurrency property. Concurrency specifies the number of async executions

.mapSeries([], fn) -> [Promise]
-> .map with concurrency : 1

.each(fn) -> Promise
  -> execute a callback for each iterable

Promise.race([Promise]) -> Promise
  -> return the first promise resolved. qualifies rejected result

.any([Promise]) -> Promise
  -> same as race but does not qualify rejected result

.some([Promise], n) -> [Promise]
  -> returns the first n promise(s) resolved as an array.

.tap(fn) -> Promise
  -> same with finally but the difference is it's not NOT CALLED on reject

.tapCatch(fn) -> Promise
  -> same with finally but the difference is it's CALLED on reject

.get(Str|n)
  -> convenient way to get a property (object) or index (array) of a promise. Returns as promise

.return(val) or .thenReturn(val)
  -> enables to return a value already bound as this method is called

Promise.using(Promise|Disposer|resource) -> Promise
  -> make sure that no matter what, the specified disposer will be called when the promise returned by the callback passed to using has settled

Promise.disposer(fn) -> Disposer
    ->  method that cleans up a resource when using Promise.using

.delay(n) -> Promise
  -> Returns a promise that will be resolved with value (or undefined) after given ms milliseconds. If value is a promise, the delay will start counting down when it is fulfilled and the returned promise will be fulfilled with the fulfillment value of the value promise. If value is a rejected promise, the resulting promise will be rejected immediately.

.timeout(n) -> Promise
  -> Returns a promise that will be fulfilled with this promise's fulfillment value or rejection reason.  if this promise is not fulfilled or rejected within ms milliseconds, the returned promise is rejected with a TimeoutError or the error as the reason

.reflect() -> Promise<PromiseInspection>
  ->  returns a promise that is always successful when this promise is settled. Its fulfillment value is an object that implements the PromiseInspection interface and reflects the resolution of this promise.

Promise.getNewLibraryCopy() -> Obj
  -> Returns a new independent copy of the Bluebird library. This method should be used before you use any of the methods which would otherwise alter the global Bluebird object - to avoid polluting global state

Promise.noConflict() -> Obj
  -> relevant to browser environments with no module loader.

Promise.setScheduler(fn(fn)) -> fn
  -> a function that asynchronously schedules the calling of the passed in function

Promise.coroutine(fn*, obj) -> fn
  -> Returns a function that can use yield to yield promises. Control is returned back to the generator when the yielded promise settles.

Promise.coroutine.addYieldHandler(fn) -> undefined
  -> By default you can only yield Promises and Thenables inside coroutines. You can use this function to add yielding support for arbitrary types.

OperationalError
  -> Represents an error is an explicit promise rejection as opposed to a thrown error. caught in .error handler

AggregateError
  -> A collection of errors. caught in .error

TimeoutError
  -> Signals that an operation has timed out

CancellationError
  -> Signals that an operation has been aborted or cancelled

Promise.onPossiblyUnhandledRejection
  -> Add handler as the handler to call when there is a possibly unhandled rejection. The default handler logs the error stack to stderr or console.error in browsers.

Promise.onUnhandledRejectionHandled
  -> Add handler as the handler to call when a rejected promise that was reported as "possibly unhandled rejection" became handled. Together with onPossiblyUnhandledRejection these hooks can be used to implement a debugger that will show a list of unhandled promise rejections updated in real time as promises become handled

Promise.config
  -> Configure long stack traces, warnings, monitoring and cancellation
