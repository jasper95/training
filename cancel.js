const Promise = require('bluebird');

Promise.config({cancellation : true})

const removeDelay = Promise
    .delay(1000)
    .finally( () => {
      if(removeDelay.isCancelled())
        console.log("CANCELLED");
      else console.log("NOT CANCELLED");
    })

removeDelay.cancel();
