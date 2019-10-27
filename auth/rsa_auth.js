const NodeRSA = require('node-rsa');
const lock = new NodeRSA(process.env.PUBLIC_KEY);
const key  = new NodeRSA(process.env.PRIVATE_KEY);

const encrypt = plaintext => {
 try { return lock.encrypt(plaintext, 'base64'); }
 catch { return '' }
}

const decrypt = encrypted => {
 try { return key.decrypt(encrypted, 'utf8'); }
 catch { return '' }
}

const authenticate = (a, b) => decrypt(a) === decrypt(b);

module.exports = { authenticate, encrypt, decrypt };
