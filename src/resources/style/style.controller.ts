import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import StyleService from '@/resources/style/style.service';
import validationMiddleware from '@/middleware/validation.middleware';
import validation from '@/resources/style/style.validation';
import HttpException from '@/utils/exceptions/http.exception';
import authenticatedMiddleware from '@/middleware/authenticated.middleware';

class StyleController implements Controller {
  public path = '/style';
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
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { _id } = req.user;
      const { name, tickers } = req.body;
      const style = await this.StyleService.create(name, tickers, _id);
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
  ): Promise<Response | void> => {};
}

export default StyleController;
