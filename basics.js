const Promise = require('bluebird');

(function(id){
  const getUserById = (id) => {
    if(id > 0 && id <= 10)
      return Promise.resolve({
        id : id,
        name: "Jasper",
        age : 22
      })
    else return Promise.reject("Does not exists")
  }
  return Promise.try(function() {
    if (typeof id !== "number")
        throw new TypeError("id must be a number");
    return getUserById(id);
  });
})(11)
  .then(res => console.log("THEN-->", res))
  .tap(() => console.log("TAP NO ERROR"))
  .tapCatch(err => console.log("TAP CATCH ERROR-->", err))
  .catch(TypeError, err => console.log("CATCH WITH SPECIFIC ERROR-->", err))
  .catch(err => console.log("CATCH GENERIC ERROR-->", err))
  .finally(() => console.log("FINALLY-->", "IM ALWAYS EXECUTED"));
