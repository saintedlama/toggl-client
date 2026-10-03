import net from 'node:net';

const ports = process.argv.slice(2).map((p) => {
  const clean = p.replace(/^tcp:/, '');
  return parseInt(clean, 10);
});

if (ports.length === 0) {
  process.exit(0);
}

function checkPort(port, host = '127.0.0.1') {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(500);

    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });

    socket.once('timeout', () => {
      socket.destroy();
      resolve(false);
    });

    socket.once('error', () => {
      socket.destroy();
      resolve(false);
    });

    socket.connect(port, host);
  });
}

const timeoutMs = 60000;
const start = Date.now();

while (Date.now() - start < timeoutMs) {
  const results = await Promise.all(ports.map((port) => checkPort(port)));
  if (results.every(Boolean)) {
    process.exit(0);
  }
  await new Promise((r) => setTimeout(r, 200));
}

console.error(`Timeout waiting for ports: ${ports.join(', ')}`);
process.exit(1);
