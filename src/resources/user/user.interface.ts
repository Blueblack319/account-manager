import { Types } from 'mongoose';
import { Style } from '../style/style.interface';

interface User {
  // variables
  _id: Types.ObjectId;
  email: string;
  name: string;
  password: string;
  role: string;
  isShared: boolean;
  isAnonym: boolean;
  styles: Style[];

  // methods
  isValidPassword(password: string): Promise<Error | boolean>;
}

interface RegisterInput {
  email: string;
  name: string;
  password: string;
  role?: string;
  isShared: boolean;
  isAnonym: boolean;
}

interface LoginInput {
  email: string;
  password: string;
}

interface EditUserInput {
  email: string;
  name: string;
  role: string;
  isShared: boolean;
  isAnonym: boolean;
}

export { User, RegisterInput, LoginInput, EditUserInput };
