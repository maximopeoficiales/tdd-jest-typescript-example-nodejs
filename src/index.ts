import axios from 'axios';
import bodyParser from 'body-parser';
import express from 'express';
import { postController } from './controllers/posts';
import { userController } from './controllers/users';
import { authenticate } from './middlewares/authenticate';
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.get('/', userController.get);
app.post('/', userController.post);
app.put('/:id', userController.put);
app.delete('/:id', userController.delete);
app.post('/post', authenticate, postController.post);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
