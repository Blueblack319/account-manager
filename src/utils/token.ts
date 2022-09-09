import { User } from '@/resources/user/user.interface';
import jwt, { Secret } from 'jsonwebtoken';

const createToken = (user: User): string => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET as Secret, {
    expiresIn: '1h',
  });
};

export default { createToken };
