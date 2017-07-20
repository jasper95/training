const Promise = require('bluebird');
const request = require('request');

Promise.promisifyAll(request);

const userIds = [...Array(10)].map((_, i) => i + 1);

Promise.map(userIds, id => {
  return request.getAsync(`http://jsonplaceholder.typicode.com/users/${id}`)
                .then(user => JSON.parse(user.body))
}).filter(user => user.id %2 == 0)
  .reduce((accum, user) => {
    console.log("elem", user.id);
    return accum += user.id
  }, 0).then(res => console.log("total", res))
  .catch(err => console.log(err));
