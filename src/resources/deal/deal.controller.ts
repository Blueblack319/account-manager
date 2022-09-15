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
    this.router.delete(
      `${this.path}/:id`,
      authenticatedMiddleware,
      this.delete
    );
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const payload = req.body;
      const userId = req.userId.toString();
      const deal = await this.DealService.create(id, userId, payload);
      res.status(201).json({ deal });
    } catch (e) {
      if (e instanceof Error) {
        next(new HttpException(400, e.message));
      }
    }
  };

  private delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      // cascade style과만 하면 됨.
      // deal이 속해있는 style인지 확인하기
      // 그 style을 소유하고 있는 유저와 로그인된 유저 비교하기
      const userId = req.userId;
      const { id } = req.params; // dealId
      await this.DealService.delete(userId, id);
    } catch (e) {
      if (e instanceof Error) {
        next(new HttpException(400, e.message));
      }
    }
  };
}

export default DealController;
