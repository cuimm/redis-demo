const redis = require('redis');

const client = redis.createClient(6379, '127.0.0.1');

client.on('error', (error) => {
  console.log(error);
});

// 字符串
client.set('name', 'cuimm', redis.print);
client.get('name', redis.print);

// hash
client.hset('person', 'name', 'cuimm2', redis.print);
client.hget('person', 'name', redis.print);

// 列表
client.lpush('links', 'a', redis.print);
client.lpush('links', 'b', redis.print);
client.lrange('links', 0, -1, redis.print);

// 集合
client.sadd('tags', 1, redis.print);
client.sadd('tags', 2, redis.print);
client.smembers('tags', redis.print);

// 在redis中模拟对象操作
client.hset('student', 'name', 'cuimm', redis.print);
client.hset('student', 'age', 18, redis.print);
client.hset('student', 'address', 'beijing', redis.print);
client.hkeys('student', (error, replies) => {
  const student = {};
  replies.forEach(key => {
    client.hget('student', key, (error, value) => {
      student[key] = value;
      console.log('!!!', student);
    });
  });
});


