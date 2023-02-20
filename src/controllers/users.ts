import axios from "axios";
import { NextFunction, Request, Response } from "express";



export class UserController {

  constructor() { }

  get = async (req: Request, res: Response, next: NextFunction) => {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
    res.status(200).send(data);
  }
  post = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req.body;
    const { data } = await axios.post("https://jsonplaceholder.typicode.com/users", body);
    res.status(201).send(data);
  }
  put = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req.body;
    const { id } = req.params;
    await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, body);
    res.sendStatus(204);
  }
  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    res.sendStatus(204);
  }
}

export const userController = new UserController();