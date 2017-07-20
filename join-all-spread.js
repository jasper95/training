const Promise = require('bluebird');
const request = require('request');

Promise.promisifyAll(request);


(function(){
  const post = request.getAsync('http://jsonplaceholder.typicode.com/posts/1');
  const user = request.getAsync('http://jsonplaceholder.typicode.com/users/1');

  // all and spread
  Promise
    .all([post, user])
    .spread((post, user) => {
      post = JSON.parse(post.body)
      user = JSON.parse(user.body)
      console.log(`${post.title}, ${user.name}`)})
    .catch(err => console.log(err));

  // join
  Promise
    .join(post, user, (post, user) => {
      post = JSON.parse(post.body)
      user = JSON.parse(user.body)
      console.log(`${post.title}, ${user.name}`)})
    .catch(err => console.log(err));
}());
