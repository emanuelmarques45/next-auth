import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ENCRYPTION_KEY = process.env.ENCT_KEY!;
const INITIALIZATION_VECTOR = process.env.IV!;

function encrypt(password: string) {
  const cipher = createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    Buffer.from(INITIALIZATION_VECTOR, 'hex')
  );
  var crypted = cipher.update(password, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(encryptedPassword: string) {
  const decipher = createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    Buffer.from(INITIALIZATION_VECTOR, 'hex')
  );
  let dec = decipher.update(encryptedPassword, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

export { encrypt, decrypt };
