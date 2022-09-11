import { Types } from 'mongoose';

declare global {
  namespace Express {
    export interface Request {
      // user?: import('../resources/user/user.interface').default;
      userId?: Types.ObjectId;
    }
  }
}
