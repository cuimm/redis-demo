const redis = require('redis');
const client1 = redis.createClient(6379, '127.0.0.1');
const client2 = redis.createClient(6379, '127.0.0.1');

// client1 同时订阅channel_a和channel_b
client1.subscribe('channel_a');
client1.subscribe('channel_b');

client1.on('message', function (channel, message) {
  console.log(channel, message);
  // 当收到第一条消息之后，立刻取消订阅频道channel_b，以后将不再收到channel_b发送过来的消息
  client1.unsubscribe('channel_b');
})

client2.publish('channel_a', 'hello');
client2.publish('channel_b', 'world');
setTimeout(function () {
  client2.publish('channel_a', 'hello22222');
  client2.publish('channel_b', 'world22222')
}, 3000);
// output:
// channel_a hello
// channel_b world
// channel_a hello22222 (3s后)


// 事物
client2.multi()
  .hset('user', 'name', 'cuimm')
  .hset('user', 'age', 18)
  .exec()
