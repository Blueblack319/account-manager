/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

/**
 * App Variables
 */
const app = express();

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
