import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import StyleService from '@/resources/style/style.service';
import validationMiddleware from '@/middleware/validation.middleware';
import validation from '@/resources/style/style.validation';
import HttpException from '@/utils/exceptions/http.exception';
import authenticatedMiddleware from '@/middleware/authenticated.middleware';
import { Types } from 'mongoose';

class StyleController implements Controller {
  public path = '/styles';
  public router = Router();
  private StyleService = new StyleService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      this.path,
      validationMiddleware(validation.create),
      authenticatedMiddleware,
      this.create
    );
    this.router.get(this.path, authenticatedMiddleware, this.findAll);
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const userId = req.userId;
      const { name, tickers } = req.body;
      const style = await this.StyleService.create(name, tickers, userId);
      res.status(201).json({ style });
    } catch (e) {
      if (e instanceof Error) {
        next(new HttpException(400, e.message)); // e.message?
      }
    }
  };

  private findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const userId = req.userId;
      const styles = await this.StyleService.findAll(userId);
      res.status(200).json({ styles });
    } catch (e) {
      if (e instanceof Error) {
        next(new HttpException(400, e.message));
      }
    }
  };
}

export default StyleController;
