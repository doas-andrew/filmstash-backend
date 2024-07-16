const NodeRSA = require('node-rsa');
const key = new NodeRSA(process.env.RSA_PRIVATE_KEY);

function encrypt(plaintext) {
    try {
        return key.encrypt(plaintext, 'base64');
    } catch {
        return '';
    }
}

function decrypt(encrypted) {
    try {
        return key.decrypt(encrypted, 'utf8');
    } catch {
        return '';
    }
}

function authenticate(a, b) {
    return decrypt(a) === decrypt(b);
}

module.exports = {
    authenticate,
    decrypt,
    encrypt,
};