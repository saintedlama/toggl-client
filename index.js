import Client from './lib/client.js';

export default function connect(options) {
  return new Client(options);
}
