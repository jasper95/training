const Promise = require('bluebird');
const request = require('request');

Promise.promisifyAll(request);

const userIds = [...Array(10)].map((_, i) => i + 1);


Promise.map(userIds, id => {
  return request.getAsync(`http://jsonplaceholder.typicode.com/users/${id}`)
                .then(user => JSON.parse(user.body))
}).each(user => console.log(user.name));
