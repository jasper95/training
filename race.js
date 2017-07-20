const Promise = require('bluebird');
const request = require('request');

Promise.promisifyAll(request);


(function(){
    const late = new Promise((resolve) => setTimeout(resolve, 500, 'late'));
    const early = new Promise((resolve) => setTimeout(resolve, 100, 'early'));
    Promise
      .race([late, early])
      .then(res => console.log(res))
})();
