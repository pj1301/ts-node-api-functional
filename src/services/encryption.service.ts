import Debug from 'debug';
import bcrypt from 'bcrypt';

const debug: Debug.Debugger = Debug('app:encryption.service');
const saltRounds: number = 10;

const encrypt = (password: string): Promise<string | void> => {
  return bcrypt.hash(password, saltRounds).catch(error => debug(error))
}

const decrypt = (password: string, hash: string): Promise<boolean | void> => {
  return bcrypt.compare(password, hash).catch(error => debug(error));
}

export { encrypt, decrypt };
