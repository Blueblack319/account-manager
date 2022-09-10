import { User } from '@/resources/user/user.interface';
import jwt from 'jsonwebtoken';
import Token from '@/utils/interfaces/token.interface';

const createToken = (user: User): string => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: '1h',
  });
};

const verifyToken = async (
  token: string
): Promise<jwt.JsonWebTokenError | Token> =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded as Token);
    });
  });

export default { createToken, verifyToken };
