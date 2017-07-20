const Promise = require('bluebird');
const request = require('request');

Promise.promisifyAll(request);


(function(){
  const post = request.getAsync('http://jsonplaceholder.typicode.com/posts/1');
  const user = request.getAsync('http://jsonplaceholder.typicode.com/users/1');

  // const promises = [post, user]
  // Promise.all(promises.map(function(promise) {
  //     return promise.reflect();
  // })).each(function(inspection) {
  //     if (inspection.isFulfilled()) {
  //         console.log("A promise in the array was fulfilled with", JSON.parse(inspection.value().body));
  //     } else {
  //         console.error("A promise in the array was rejected with", inspection.reason());
  //     }
  // });

  const object = {post, user}
  Promise.props(Object.keys(object).reduce(function(newObject, key) {
      newObject[key] = object[key].reflect();
      return newObject;
  }, {})).then(function(object) {
      if (object.post.isFulfilled()) {
          console.log("first was fulfilled with", JSON.parse(object.post.value().body));
      } else {
          console.error("first was rejected with", object.first.reason());
      }
  })
})();
