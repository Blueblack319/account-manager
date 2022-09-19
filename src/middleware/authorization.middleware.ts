import { Request, Response, NextFunction } from 'express';
import StyleModel from '@/resources/style/style.model';
import UserModel from '@/resources/user/user.model';
import HttpException from '@/utils/exceptions/http.exception';

async function checkStyleOwnerMiddleware(
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const style = await StyleModel.findById(id).select('owner');
    if (!style) {
      throw new Error('Style not found');
    }
    if (!userId.equals(style.owner)) {
      throw new Error('This sytle is not yours');
    }
    next();
  } catch (e) {
    if (e instanceof Error) {
      next(new HttpException(400, e.message));
    }
  }
}

async function checkDealStyleMiddleware(
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.userId;
    const { id } = req.params; // deal id
    const style = await StyleModel.findOne({ deals: { $in: id } }).select(
      '_id'
    );
    if (!style) {
      throw new Error('Style not found');
    }
    const user = await UserModel.findOne({ styles: { $in: style._id } }).select(
      '_id'
    );
    if (!user) {
      throw new Error('User not found');
    }
    if (!userId.equals(user._id)) {
      throw new Error('Unauthorized');
    }
    next();
  } catch (e) {
    if (e instanceof Error) {
      next(new HttpException(400, e.message));
    }
  }
}

export { checkStyleOwnerMiddleware, checkDealStyleMiddleware };
