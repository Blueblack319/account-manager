import { Types } from 'mongoose';

interface User {
  // variables
  _id: Types.ObjectId;
  email: string;
  name: string;
  password: string;
  role: string;

  // methods
  isValidPassword(password: string): Promise<Error | boolean>;
}

export { User };
