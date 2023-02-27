import axios from "axios";
import { NextFunction, Request, Response } from "express";

export class PostController {

  constructor() { }

  post = async (req: Request, res: Response, next: NextFunction) => {
    const { data: users } = await axios.get("https://jsonplaceholder.typicode.com/users");
    console.log(req.body);
    
    const found = users.find((u: { id: number }) => u.id == parseInt(req.body.userId));
    if (found) {
      const { data } = await axios.post("https://jsonplaceholder.typicode.com/posts", req.body);
      return res.status(201).send(data);
    }
    return res.sendStatus(400);

  }
}

export const postController = new PostController();