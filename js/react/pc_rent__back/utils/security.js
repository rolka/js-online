const crypto = require('crypto');
const generateSalt = () => {
    return crypto.randomBytes(16).toString('hex');

}
const hashPassword = ( password, salt ) => {
    const hash = crypto.createHmac('sha256', salt);
    hash.update(password);
    return hash.digest('hex');
}
const isValidPassword = ( providedPassword, salt, hashedPassword ) => {
    return hashPassword(providedPassword, salt) === hashedPassword;
}
module.exports = {
    generateSalt,
    hashPassword,
    isValidPassword
}


