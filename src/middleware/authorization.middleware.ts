import { Request, Response, NextFunction } from 'express';
import StyleModel from '@/resources/style/style.model';
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
  } catch (e) {
    if (e instanceof Error) {
      next(new HttpException(400, e.message));
    }
  }
}

export { checkStyleOwnerMiddleware };
