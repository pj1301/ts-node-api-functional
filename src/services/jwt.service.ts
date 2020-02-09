import Debug from 'debug';
import jwt from 'jsonwebtoken';

const debug = Debug('app:jwt.service');
const secret: string = 'This is a secret string';

const generateToken = (id: string): string => {
  return jwt.sign({ id }, secret, { algorithm: 'HS256', expiresIn: '5m' });
}

const deciferToken = (token: string): boolean | any => {
  let decoded: any;
  try {
    decoded = jwt.verify(token, secret);
  } catch (error) {
    debug(error.message);
    return false;
  }
  return decoded;
}

export { generateToken, deciferToken };
