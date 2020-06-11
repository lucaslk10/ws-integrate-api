import * as fs from 'fs';
import * as path from 'path';

/**
 * This function defines which certificate the MS will use
 */
function defineCert(NODE_ENV) {
  switch (NODE_ENV) {
    case 'DEV':
      return {
        cert: fs.readFileSync(path.resolve(__dirname, `../cert/${process.env.SSL_CERT}`), 'utf8'),
        key: fs.readFileSync(path.resolve(__dirname, `../cert/${process.env.SSL_KEY}`), 'utf8'),
      };

    case 'QA':
      return {
        cert: fs.readFileSync(path.resolve(`/etc/ssl/${process.env.SSL_CERT}`), 'utf8'),
        key: fs.readFileSync(path.resolve(`/etc/ssl/${process.env.SSL_KEY}`), 'utf8'),
      };

    case 'PROD':
      return {
        cert: fs.readFileSync(path.resolve(`/etc/ssl/${process.env.SSL_CERT}`), 'utf8'),
        key: fs.readFileSync(path.resolve(`/etc/ssl/${process.env.SSL_KEY}`), 'utf8'),
      };

    default:
      return {
        cert: fs.readFileSync(path.resolve(__dirname, `../cert/${process.env.SSL_CERT}`), 'utf8'),
        key: fs.readFileSync(path.resolve(__dirname, `../cert/${process.env.SSL_KEY}`), 'utf8'),
      };
  }
}

export { defineCert };
