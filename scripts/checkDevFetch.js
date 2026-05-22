const http = require('http');
const url = 'http://127.0.0.1:3003/';
const req = http.get(url, (res) => {
  console.log('status', res.statusCode);
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('body start:', body.slice(0, 400));
  });
});
req.on('error', err => {
  console.error('http-error', err && err.message);
});
req.setTimeout(10000, () => {
  console.error('timeout');
  req.abort();
});
