const Promise = require('bluebird');

const test = Promise.method(function(id){
    switch(typeof id){
      case "number":
        return Promise.resolve("number");
      case "string":
        return "string";
      default:
        return new Error("testtest");
    }
});
test(1)
  .then(res => console.log(res))
  .catch(err => console.log(err.message));
