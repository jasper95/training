const Promise = require('bluebird');
const request = require('request');

Promise.promisifyAll(request);

Promise.coroutine(function* () {
  try{
    const post = yield request.getAsync('http://jsonplaceholder.typicode.com/posts/1');
    const user = yield request.getAsync('http://jsonplaceholder.typicode.com/users/1');
    console.log(post.body, user.body);
  }catch(e){
    console.log(e)
  }
})();
