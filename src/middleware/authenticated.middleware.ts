import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

function authenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log(req.headers);
  // headers에서 토큰 받기
  // verify token
  // req.user에 넣어주기
}

export default authenticatedMiddleware;
