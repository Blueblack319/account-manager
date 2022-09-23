import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/validateEnv';
import UserController from './resources/user/user.controller';
import StyleController from './resources/style/style.controller';
import DealController from './resources/deal/deal.controller';

validateEnv();

const app = new App(
  [new UserController(), new StyleController(), new DealController()],
  Number(process.env.PORT)
);

app.listen();
