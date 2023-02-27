import axios from "axios";
import { NextFunction, Request, Response } from "express";

export class PostController {

  constructor() { }

  get = async (req: Request, res: Response, next: NextFunction) => {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
    return res.status(200).send(data);
  }
  post = async (req: Request, res: Response, next: NextFunction) => {
    const { data: users } = await axios.get("https://jsonplaceholder.typicode.com/users");
    const found = users.find(u => u.id === req.body.userId);
    if (found) {
      const { data } = await axios.post("https://jsonplaceholder.typicode.com/posts", req.body);
      return res.status(201).send(data);
    }
    return res.sendStatus(500);

  }
  put = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req.body;
    const { id } = req.params;
    await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, body);
    return res.sendStatus(204);
  }
  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    return res.sendStatus(204);
  }
}

export const postController = new PostController();