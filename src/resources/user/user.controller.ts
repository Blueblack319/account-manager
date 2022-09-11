import { Request, Response, Router, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import StyleService from '@/resources/style/style.service';
import UserService from '@/resources/user/user.service';
import authenticatedMiddleware from '@/middleware/authenticated.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import validation from '@/resources/user/user.validation';

class UserController implements Controller {
  public path = '/user';
  public router = Router();
  private UserService = new UserService();
  private StyleService = new StyleService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(validation.register),
      this.register
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validation.login),
      this.login
    );
    this.router.get(this.path, authenticatedMiddleware, this.getUser);
    this.router.get(
      `${this.path}/styles`,
      authenticatedMiddleware,
      this.findAllInUser
    );
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
    if (!req.userId) {
      next(new HttpException(400, 'Not logged in user'));
    }
    res.status(200).send({ data: req.userId });
  };

  private findAllInUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const userId = req.userId;
      const styles = await this.StyleService.findAllInUser(userId);
      return res.status(200).json({ styles });
    } catch (e) {
      if (e instanceof Error) {
        next(new HttpException(400, e.message));
      }
    }
  };
}

export default UserController;
