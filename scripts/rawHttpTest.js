const net = require('net');
const client = new net.Socket();
let data = '';
client.connect(3003, '127.0.0.1', () => {
  client.write('GET / HTTP/1.1\r\nHost: 127.0.0.1:3003\r\nConnection: close\r\n\r\n');
});
client.on('data', chunk => { data += chunk.toString(); });
client.on('end', () => {
  console.log('end', data.slice(0, 500));
  process.exit(0);
});
client.on('error', err => {
  console.error('error', err.message);
  process.exit(1);
});
client.setTimeout(10000, () => {
  console.error('timeout');
  client.destroy();
  process.exit(1);
});
