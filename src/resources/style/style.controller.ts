import { Router, Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { NameQuery } from './style.interface';
import Controller from '@/utils/interfaces/controller.interface';
import StyleService from '@/resources/style/style.service';
import validationMiddleware from '@/middleware/validation.middleware';
import validation from '@/resources/style/style.validation';
import HttpException from '@/utils/exceptions/http.exception';
import authenticatedMiddleware from '@/middleware/authenticated.middleware';
import { checkStyleOwnerMiddleware } from '@/middleware/authorization.middleware';

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
      validationMiddleware(validation.createVal),
      authenticatedMiddleware,
      this.create
    );
    this.router.get('/my-styles', authenticatedMiddleware, this.findMyAll);
    this.router.get(`${this.path}/all`, this.findAll);
    this.router.get(`${this.path}/:id`, authenticatedMiddleware, this.findById);
    this.router.get(this.path, this.findByTitle);
    this.router.patch(
      `${this.path}/:id`,
      validationMiddleware(validation.editVal),
      authenticatedMiddleware,
      checkStyleOwnerMiddleware,
      this.edit
    );
    this.router.delete(
      `${this.path}/:id`,
      authenticatedMiddleware,
      checkStyleOwnerMiddleware,
      this.delete
    );
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const userId = req.userId;
      const payload = req.body;
      const style = await this.StyleService.create(userId, payload);
      res.status(201).json({ style });
    } catch (e) {
      if (e instanceof Error) {
        next(new HttpException(400, e.message));
      }
    }
  };

  private findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const styles = await this.StyleService.findAll();
      res.status(200).json({ styles });
    } catch (e) {
      if (e instanceof Error) {
        next(new HttpException(400, e.message));
      }
    }
  };

  private findMyAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const userId = req.userId;
      const styles = await this.StyleService.findMyAll(userId);
      res.status(200).json({ styles });
    } catch (e) {
      if (e instanceof Error) {
        next(new HttpException(400, e.message));
      }
    }
  };

  private findById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const userId = req.userId;
      const style = await this.StyleService.findById(
        new Types.ObjectId(id),
        userId
      );
      res.status(200).json({ style });
    } catch (e) {
      if (e instanceof Error) {
        next(new HttpException(400, e.message));
      }
    }
  };

  private findByTitle = async (
    req: Request<{}, {}, {}, NameQuery>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { name } = req.query;
      const styles = await this.StyleService.findByName(name);
      res.status(200).json({ styles });
    } catch (e) {
      if (e instanceof Error) {
        next(new HttpException(400, e.message));
      }
    }
  };

  private edit = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const payload = req.body;
      const { id } = req.params;
      await this.StyleService.edit(id, payload);
      res.status(200).json({ isSuccess: true });
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
      const { id } = req.params;
      const userId = req.userId;
      await this.StyleService.delete(id, userId);
      res.status(200).send('Success');
    } catch (e) {
      if (e instanceof Error) {
        next(new HttpException(400, e.message));
      }
    }
  };
}

export default StyleController;
