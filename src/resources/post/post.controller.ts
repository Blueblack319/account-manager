import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/post/post.validation';
import PostService from '@/resources/post/post.service';

class PostController implements Controller {
  public path = '/posts';
  public router = Router();
  private PostService = new PostService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      this.path,
      validationMiddleware(validate.create),
      this.create
    );
    this.router.get(this.path, this.findAll);
    this.router.get(`${this.path}/:id`, this.findById);
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { title, body } = req.body;
      const post = await this.PostService.create(title, body);
      res.status(201).json({ post });
    } catch (e) {
      next(new HttpException(400, 'Cannot create a post')); // e.message?
    }
  };

  private findAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const posts = await this.PostService.findAll();
      res.status(200).json({ ...posts });
    } catch (e) {
      next(new HttpException(400, 'Cannot find all posts')); // e.message?
    }
  };

  private findById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const post = await this.PostService.findById(id);
      res.status(200).json({ post });
    } catch (e) {
      next(new HttpException(400, 'Cannot find all posts')); // e.message?
    }
  };
}

export default PostController;
