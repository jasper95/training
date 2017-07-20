const Promise = require('bluebird');
const fs = require('fs');

Promise.promisifyAll(fs);

class Cat {
  constructor(age, color){
    this.age = age;
    this.color = color;
  }

  myFunc(){
    fs.readFileAsync('test.txt').bind(this)
      .then(function(file) {
        return this.color;
      }).then(function(color) {
        console.log(`The cat is ${color} and is ${this.age} years old`)
      })
      .catch( err => console.log(err))
  }
}
const kitty = new Cat(12, 'Blue')
kitty.myFunc();
