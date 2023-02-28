import * as bodyParser from 'body-parser';
import * as express from 'express';
import { PostController } from './controllers/post.controller';
import { UserController } from './controllers/user.controller';
import { authenticate } from './middlewares/authenticate.middleware';
import { axiosInstance } from './services/axios';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const userController = new UserController(axiosInstance);
const postController = new PostController(axiosInstance);

app.get('/', userController.get);
app.post('/', userController.post);
app.put('/:id', userController.put);
app.delete('/:id', userController.delete);
app.post('/posts', authenticate, postController.post);


export default app;