import * as bodyParser from 'body-parser';
import * as express from 'express';
import { postController } from './controllers/posts.controller';
import { userController } from './controllers/users.controller';
import { authenticate } from './middlewares/authenticate.middleware';
export const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.get('/', userController.get);
app.post('/', userController.post);
app.put('/:id', userController.put);
app.delete('/:id', userController.delete);
app.post('/posts', authenticate, postController.post);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
