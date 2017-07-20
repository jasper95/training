const Promise = require('bluebird')
const request = require('request');
const fs = require('fs');

Promise.promisifyAll(fs)
Promise.promisifyAll(request);

// Promise basics
// (function(id){
//   const getUserById = (id) => {
//     if(id > 0 && id <= 10)
//       return Promise.resolve({
//         id : id,
//         name: "Jasper",
//         age : 22
//       })
//     else return Promise.reject("Does not exists")
//   }
//   return Promise.try(function() {
//     if (typeof id !== "number")
//         throw new TypeError("id must be a number");
//     return getUserById(id);
//   });
// })(11)
//   .then(res => console.log("THEN-->", res))
//   .tap(() => console.log("TAP NO ERROR"))
//   .tapCatch(err => console.log("TAP CATCH ERROR-->", err))
//   .catch(TypeError, err => console.log("CATCH WITH SPECIFIC ERROR-->", err))
//   .catch(err => console.log("CATCH GENERIC ERROR-->", err))
//   .finally(() => console.log("FINALLY-->", "IM ALWAYS EXECUTED"));

// bind
// class Cat {
//   constructor(age, color){
//     this.age = age;
//     this.color = color;
//   }
//
//   myFunc(){
//     fs.readFileAsync('test.txt').bind(this)
//       .then(function(file) {
//         return this.color;
//       }).then(function(color) {
//         console.log(`The cat is ${color} and is ${this.age} years old`)
//       })
//       .catch( err => console.log(err))
//   }
// }
// const kitty = new Cat(12, 'Blue')
// kitty.myFunc();

// (function(){
//   const post = request.getAsync('http://jsonplaceholder.typicode.com/posts/1');
//   const user = request.getAsync('http://jsonplaceholder.typicode.com/users/1');
//
//   // all and spread
//   Promise.all([post, user])
//     .spread((post, user) => {
//       post = JSON.parse(post.body)
//       user = JSON.parse(user.body)
//       console.log(`${post.title}, ${user.name}`)
//     }).catch(err => console.log(err));
//
//   // join
//   Promise.join(post, user, (post, user) => {
//     post = JSON.parse(post.body)
//     user = JSON.parse(user.body)
//     console.log(`${post.title}, ${user.name}`)
//   }).catch(err => console.log(err));
// }());


const userIds = [...Array(10)].map((_, i) => i + 1);

 // map filter reduce
// Promise.map(userIds, id => {
//   return request.getAsync(`http://jsonplaceholder.typicode.com/users/${id}`)
//                 .then(user => JSON.parse(user.body))
// }).filter(user => user.id %2 == 0)
//   .reduce((accum, user) => {
//     console.log("elem", user.id);
//     return accum += user.id
//   }, 0).then(res => console.log("total", res))
//   .catch(err => console.log(err));

// // each
// Promise.map(userIds, id => {
//   return request.getAsync(`http://jsonplaceholder.typicode.com/users/${id}`)
//                 .then(user => JSON.parse(user.body))
// }).each(user => console.log(user.name));

// // coroutine
// class PingPong {
//   constructor(){
//     this.pong = Promise.coroutine(function*(value){
//       console.log("Ping?", value);
//       yield Promise.delay(500);
//       this.ping(value + 1)
//     })
//     this.ping  = Promise.coroutine(function*(value){
//       console.log("Ping?", value);
//       yield Promise.delay(500);
//       this.ping(value + 1);
//     });
//   }
// }
// const testPingPong = new PingPong();
// testPingPong.ping(0);

// race
// (function(){
//     const late = new Promise((resolve) => setTimeout(resolve, 500, 'late'));
//     const early = new Promise((resolve) => setTimeout(resolve, 100, 'early'));
//     Promise.race([late, early]).then(res => console.log(res))
// })();

// coroutine with generators
Promise.coroutine(function* () {
  //try{
    const post = yield request.getAsync('http://jsonplaceholder.typicode.com/posts/1');
    const user = yield request.getAsync('http://jsonplaceholder.typicode.com/users/1');
    console.log(post.body, user.body);
  // }catch(e){
  //   console.log(e)
  // }
})();

// //.reflect
// (function(){
//   const post = request.getAsync('http://jsonplaceholder.typicode.com/posts/1');
//   const user = request.getAsync('http://jsonplaceholder.typicode.com/users/1');
//
//   //const promises = [post, user]
//   // Promise.all(promises.map(function(promise) {
//   //     return promise.reflect();
//   // })).each(function(inspection) {
//   //     if (inspection.isFulfilled()) {
//   //         console.log("A promise in the array was fulfilled with", JSON.parse(inspection.value().body));
//   //     } else {
//   //         console.error("A promise in the array was rejected with", inspection.reason());
//   //     }
//   // });
//
//   // const object = {post, user}
//   // Promise.props(Object.keys(object).reduce(function(newObject, key) {
//   //     newObject[key] = object[key].reflect();
//   //     return newObject;
//   // }, {})).then(function(object) {
//   //     if (object.post.isFulfilled()) {
//   //         console.log("first was fulfilled with", JSON.parse(object.post.value().body));
//   //     } else {
//   //         console.error("first was rejected with", object.first.reason());
//   //     }
//   // })
// })();
