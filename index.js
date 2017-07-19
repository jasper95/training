const Promise = require('bluebird')
const request = require('request');
const fs = require('fs');

Promise.promisifyAll(fs)
Promise.promisifyAll(request);

//new Promise
// let myFirstPromise = new Promise((resolve, reject) => {
//   setTimeout(function(){
//     resolve("Success!");
//   }, 1000);
// });
//
// myFirstPromise.then((successMessage) => {
//   console.log("Yay! " + successMessage);
// });

// const post = request.getAsync('http://jsonplaceholder.typicode.com/posts/1');
// const user = request.getAsync('http://jsonplaceholder.typicode.com/users/1');

//all and spread
// Promise.all([post, user])
//   .spread((post, user) => {
//     post = JSON.parse(post.body)
//     user = JSON.parse(user.body)
//     console.log(`${post.title}, ${user.name}`)
//   }).catch(err => console.log(err));

//join
// Promise.join(post, user, (post, user) => {
//   post = JSON.parse(post.body)
//   user = JSON.parse(user.body)
//   console.log(`${post.title}, ${user.name}`)
// }).catch(err => console.log(err));



//const userIds = [...Array(10)].map((_, i) => i + 1);

//map
// Promise.map(userIds, id => {
//   return request.getAsync(`http://jsonplaceholder.typicode.com/users/${id}`)
//                 .then(user => JSON.parse(user.body).name)
// }).then(names => console.log(names.join(", ")))
//   .catch(err => console.log(err))

class PingPong {
  constructor(){
    this.pong = Promise.coroutine(function*(value){
      console.log("Ping?", value);
      yield Promise.delay(500);
      this.ping(value + 1)
    })
    this.ping  = Promise.coroutine(function*(value){
      console.log("Ping?", value);
      yield Promise.delay(500);
      this.ping(value + 1)
    });
  }
}
const testPingPong = new PingPong();
testPingPong.ping(0);


//coroutine with generators
// Promise.coroutine(function* () {
//   const post2 = yield request.getAsync('http://jsonplaceholder.typicode.com/posts/1');
//   const user2 = yield request.getAsync('http://jsonplaceholder.typicode.com/users/1');
//   console.log(post2.body, user2.body);
// })();
//
// //bind
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
