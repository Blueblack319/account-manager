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
      '/signup',
      validationMiddleware(validation.signup),
      this.signup
    );
    this.router.post(
      '/signin',
      validationMiddleware(validation.signin),
      this.signin
    );
    this.router.get(`${this.path}/all`, this.findAll);
    this.router.get(
      `${this.path}/styles`,
      authenticatedMiddleware,
      this.findAllStyleInUser
    );
    this.router.get('/profile', authenticatedMiddleware, this.getLoggedInUser);
    this.router.get(`${this.path}/:id`, authenticatedMiddleware, this.findById);
    this.router.patch(
      `${this.path}/profile`,
      authenticatedMiddleware,
      validationMiddleware(validation.editUser),
      this.editUser
    );
    this.router.patch(
      `${this.path}/profile/password`,
      authenticatedMiddleware,
      validationMiddleware(validation.editUserPassword),
      this.editUserPassword
    );
    this.router.delete(
      `${this.path}/loggedIn`,
      authenticatedMiddleware,
      this.deleteLoggedInUser
    );
  }

  private signup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const payload = req.body;
      const token = await this.UserService.signup(payload);
      res.status(201).json({ token });
    } catch (error: unknown) {
      if (error instanceof Error) {
        next(new HttpException(400, error.message));
      }
    }
  };

  private signin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const payload = req.body;
      const token = await this.UserService.signin(payload);
      res.status(200).json({ token });
    } catch (error: unknown) {
      if (error instanceof Error) {
        next(new HttpException(400, error.message));
      }
    }
  };

  private findAllStyleInUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const userId = req.userId;
      const styles = await this.StyleService.findAllStyleInUser(userId);
      return res.status(200).json({ styles });
    } catch (e) {
      if (e instanceof Error) {
        next(new HttpException(400, e.message));
      }
    }
  };

  private getLoggedInUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const userId = req.userId;
      const user = await this.UserService.getLoggedInUser(userId);
      return res.status(200).json({ user });
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
      const users = await this.UserService.findAll();
      return res.status(200).json({ users });
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
      const user = await this.UserService.findById(id);
      return res.status(200).json({ user });
    } catch (e) {
      if (e instanceof Error) {
        next(new HttpException(400, e.message));
      }
    }
  };

  private deleteLoggedInUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const userId = req.userId;
      await this.UserService.deleteLoggedInUser(userId);
      return res.status(200).send('Success');
    } catch (e) {
      if (e instanceof Error) {
        next(new HttpException(400, e.message));
      }
    }
  };

  private editUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const userId = req.userId;
      const payload = req.body;
      await this.UserService.editUser(userId, payload);
      return res.status(200).send('Success');
    } catch (e) {
      if (e instanceof Error) {
        next(new HttpException(400, e.message));
      }
    }
  };

  private editUserPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const userId = req.userId;
      const { password } = req.body;
      await this.UserService.editUserPassword(userId, password);
      return res.status(200).send('Success');
    } catch (e) {
      if (e instanceof Error) {
        next(new HttpException(400, e.message));
      }
    }
  };
}

export default UserController;
