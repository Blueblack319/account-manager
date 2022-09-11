import { Types } from 'mongoose';
import { Style } from '../style/style.interface';

interface User {
  // variables
  _id: Types.ObjectId;
  email: string;
  name: string;
  password: string;
  role: string;
  styles: Style[];

  // methods
  isValidPassword(password: string): Promise<Error | boolean>;
}

export { User };
