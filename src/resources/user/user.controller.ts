import { Request, Response, Router, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import UserService from '@/resources/user/user.service';
import HttpException from '@/utils/exceptions/http.exception';
import authenticatedMiddleware from '@/middleware/authenticated.middleware';

class UserController implements Controller {
  public path = '/user';
  public router = Router();
  private UserService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(`${this.path}/register`, this.register);
    this.router.post(`${this.path}/login`, this.login);
    this.router.get(this.path, authenticatedMiddleware, this.getUser);
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, name, password } = req.body;
      const token = await this.UserService.register(
        email,
        name,
        password,
        'user'
      );
      res.status(201).json({ token });
    } catch (error: unknown) {
      if (error instanceof Error) {
        next(new HttpException(400, error.message));
      }
    }
  };

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body;
      const token = await this.UserService.login(email, password);
      res.status(200).json({ token });
    } catch (error: unknown) {
      if (error instanceof Error) {
        next(new HttpException(400, error.message));
      }
    }
  };

  private getUser = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    if (!req.user) {
      next(new HttpException(400, 'Not logged in user'));
    }
    res.status(200).send({ data: req.user });
  };
}

export default UserController;
