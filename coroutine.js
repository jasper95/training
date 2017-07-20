const Promise = require('bluebird');

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
      this.ping(value + 1);
    });
  }
}
const testPingPong = new PingPong();
testPingPong.ping(0);
