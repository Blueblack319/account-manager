import { Types } from 'mongoose';
import { Style } from '../style/style.interface';

interface User {
  // variables
  _id: Types.ObjectId;
  email: string;
  name: string;
  password: string;
  styles: Style[];

  // methods
  isValidPassword(password: string): Promise<Error | boolean>;
}

// inter
interface SignupInput {
  email: string;
  name: string;
  password: string;
}

interface SigninInput {
  email: string;
  password: string;
}

interface EditUserInput {
  email: string;
  name: string;
}

export { User, SignupInput, SigninInput, EditUserInput };
