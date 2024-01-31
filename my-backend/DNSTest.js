const dns = require('dns');

// Extracted the domain part from your connection string
const hostname = '_mongodb._tcp.scheduling-cluster.bp7uyyv.mongodb.net';

console.log(`Resolving DNS for: ${hostname}`);

// Using resolveSrv to mimic the mongodb+srv protocol behavior
dns.resolveSrv(hostname, (err, addresses) => {
  if (err) {
    console.error('DNS resolution failed', err);
    return;
  }

  console.log('DNS resolution succeeded. Addresses:', addresses);
});

// Additionally, using resolve4 to check A (IPv4) records
dns.resolve4(hostname.replace('_mongodb._tcp.', ''), (err, addresses) => {
  if (err) {
    console.error('DNS resolution (A record) failed', err);
    return;
  }

  console.log('A record resolution succeeded. Addresses:', addresses);
});

