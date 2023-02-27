import * as bodyParser from 'body-parser';
import * as express from 'express';
import { PostController } from './controllers/posts.controller';
import { UserController } from './controllers/users.controller';
import { authenticate } from './middlewares/authenticate.middleware';
import { axiosInstance } from './services/axios';
export const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const userController = new UserController(axiosInstance);
const postController = new PostController(axiosInstance);

app.get('/', userController.get);
app.post('/', userController.post);
app.put('/:id', userController.put);
app.delete('/:id', userController.delete);
app.post('/posts', authenticate, postController.post);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
