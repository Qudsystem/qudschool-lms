/**
 * Usage:
 *  node scripts/test-security-headers.js https://192.168.1.5
 */
const https = require('https');
const http = require('http');
const url = process.argv[2] || 'https://192.168.1.5';

const client = url.startsWith('https') ? https : http;

client.get(url, (res) => {
  console.log('Status:', res.statusCode);
  const headers = res.headers;
  const keys = [
    'strict-transport-security',
    'content-security-policy',
    'x-content-type-options',
    'x-frame-options',
    'referrer-policy',
    'permissions-policy'
  ];
  keys.forEach(k => {
    console.log(k, '=>', headers[k] || '(missing)');
  });
  res.resume();
}).on('error', (e) => {
  console.error('Fetch failed:', e.message);
});
