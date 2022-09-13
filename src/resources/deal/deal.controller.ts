import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import DealService from '@/resources/deal/deal.service';
import HttpException from '@/utils/exceptions/http.exception';
import authenticatedMiddleware from '@/middleware/authenticated.middleware';

class DealController implements Controller {
  public path = '/deal';
  public router = Router();
  private DealService = new DealService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}/:id`, authenticatedMiddleware, this.create);
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const { description, tickers } = req.body;
      const userId = req.userId.toString();
      const deal = await this.DealService.create(
        id,
        userId,
        description,
        tickers
      );
      res.status(201).json({ deal });
    } catch (e) {
      if (e instanceof Error) {
        next(new HttpException(400, e.message));
      }
    }
  };
}

export default DealController;
