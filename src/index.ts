import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import PostController from '@/resources/post/post.controller';
import validateEnv from '@/utils/validateEnv';
import UserController from './resources/user/user.controller';
import StyleController from './resources/style/style.controller';

validateEnv();

const app = new App(
  [new PostController(), new UserController(), new StyleController()],
  Number(process.env.PORT)
);

app.listen();
