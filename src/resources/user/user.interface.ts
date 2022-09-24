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

interface SignupInput {
  email: string;
  name: string;
  password: string;
}

interface SignupOutput {
  id: string;
  email: string;
  name: string;
  token: string;
}

interface SigninInput {
  email: string;
  password: string;
}

interface SigninOutput extends SignupOutput {}

interface EditUserInput {
  email: string;
  name: string;
}

export {
  User,
  SignupInput,
  SigninInput,
  EditUserInput,
  SigninOutput,
  SignupOutput,
};
