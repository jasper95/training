const Promise = require('bluebird')
const request = require('request');

Promise.promisifyAll(request);

// code taken from DOCS
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
  try{
    let post = yield request.getAsync('http://jsonplaceholder.typicode.com/posts/1');
    post = JSON.parse(post.body)
    let user = yield request.getAsync('http://jsonplaceholder.typicode.com/users/1');
    user = JSON.parse(user.body);
    return {
      status: "OK",
      user,
      post,
    };
  }catch(e){
      return {status: "FAILED"};
  }
})().then(res => console.log(res));
