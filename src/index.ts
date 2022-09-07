import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import PostController from '@/resources/post/post.controller';
import validateEnv from '@/utils/validateEnv';

validateEnv();

const app = new App([new PostController()], Number(process.env.PORT));

app.listen();
