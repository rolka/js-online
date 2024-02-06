const crypto = require('crypto');

const hashPassword = ( password, salt ) =>
{
    const hash = crypto.createHmac('sha256', salt);
    hash.update(password);
    return hash.digest('hex');
}
const generateSalt = () => {
  return crypto.randomBytes(16).toString('hex');
}
const isValidCredentials = ( providedPassword, salt, hashedPassword ) =>
{
    return hashPassword( providedPassword, salt ) === hashedPassword
}


module.exports = { hashPassword, generateSalt, isValidCredentials }













