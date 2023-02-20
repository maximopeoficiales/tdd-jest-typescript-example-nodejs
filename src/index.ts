import axios from 'axios';
import bodyParser from 'body-parser';
import express from 'express';
import { userController } from './controllers/users';
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));



app.get('/', userController.get);
app.post('/', userController.post);
app.put('/:id', userController.put);
app.delete('/:id', userController.delete);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
