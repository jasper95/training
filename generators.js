const Promise = require('bluebird')
const request = require('request');

Promise.promisifyAll(request);

// const myGen = function*() {
//   const one = yield 1;
//   const two = yield 2;
//   const three = yield 3;
//   console.log(one, two, three); // 3, 4, 5
// };
//
// const gen = myGen(); //get the generator ready to run
// console.log(gen.next()); //{value:1, done: false}
// console.log(gen.next(3)); //{value:2, done: false}
// console.log(gen.next(4)); //{value:3, done: false}
// console.log(gen.next(5)); //{value:undefined, done: true}
// console.log(gen.next()); //{value:undefined, done: true}

function async(makeGenerator){
  return function () {
    const generator = makeGenerator.apply(this, arguments);

    function handle(result){
      // result => { done: [Boolean], value: [Object] }
      if (result.done) return Promise.resolve(result.value);

      return Promise.resolve(result.value).then(function (res){
        return handle(generator.next(res));
      }, function (err){
        return handle(generator.throw(err));
      });
    }

    try {
      return handle(generator.next());
    } catch (ex) {
      return Promise.reject(ex);
    }
  }
}

async(function* () {
  const post2 = yield request.getAsync('http://jsonplaceholder.typicode.com/posts/1');
  const user2 = yield request.getAsync('http://jsonplaceholder.typicode.com/users/1');
  console.log(post2.body, user2.body);
})();
