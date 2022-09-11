import HttpException from '@/utils/exceptions/http.exception';
import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import token from '@/utils/token';
import UserModel from '@/resources/user/user.model';
import Token from '@/utils/interfaces/token.interface';

async function authenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // headers에서 bearer 받기
  const bearer = req.headers.authorization;
  // check a bearer
  if (!bearer || !bearer.startsWith('Bearer')) {
    return next(new HttpException(401, 'Unauthorized'));
  }
  // get token
  const accessToken = bearer.split('Bearer')[1].trim();
  // verify token
  try {
    const decoded: Token | JsonWebTokenError = await token.verifyToken(
      accessToken
    );
    if (decoded instanceof JsonWebTokenError) {
      return next(new HttpException(401, 'Unauthorized'));
    }

    const existed = await UserModel.exists({ _id: decoded.id });

    if (!existed) {
      return next(new HttpException(401, 'Unauthorized'));
    }

    req.userId = existed._id;
    return next();
  } catch (error) {
    return next(new HttpException(401, 'Unauthorized'));
  }
  // req.user에 넣어주기
}

export default authenticatedMiddleware;
