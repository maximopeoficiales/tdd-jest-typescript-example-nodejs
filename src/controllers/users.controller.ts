import { AxiosInstance } from "axios";
import { NextFunction, Request, Response } from "express";
export class UserController {

  constructor(private axios: AxiosInstance) { }

  get = async (req: Request, res: Response, next: NextFunction) => {
    const { data } = await this.axios.get("/users");
    return res.status(200).send(data);
  }
  post = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req.body;
    const { data } = await this.axios.post("/users", body);
    return res.status(201).send(data);
  }
  put = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req.body;
    const { id } = req.params;
    await this.axios.put(`/users/${id}`, body);
    return res.sendStatus(204);
  }
  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await this.axios.delete(`/users/${id}`);
    return res.sendStatus(204);
  }
}
