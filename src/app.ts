import express from 'express';
import * as controllers from './controllers';
import { Request, Response } from 'express';

const app = express();
const {
  PORT = 3000,
} = process.env;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

controllers.init(app);

app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'hello world',
  });
});

app.listen(PORT, () => {
  console.log('server started at http://localhost:'+PORT);
});