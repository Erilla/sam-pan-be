import express from 'express';
import * as controllers from './controllers';
import { Request, Response } from 'express';
import compression from 'compression';
import helmet from 'helmet';

const app = express();
const {
  PORT = 3000,
} = process.env;

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression()); // Compress all routes

controllers.init(app);

app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'hello world',
  });
});

app.listen(PORT, () => {
  console.log('server started at http://localhost:'+PORT);
});