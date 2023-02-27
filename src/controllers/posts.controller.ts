import { AxiosInstance } from "axios";
import { NextFunction, Request, Response } from "express";

export class PostController {

  constructor(private axios: AxiosInstance) { }

  post = async (req: Request, res: Response, next: NextFunction) => {
    const { data: users } = await this.axios.get("/users");
    const found = users.find((u: { id: number }) => u.id == parseInt(req.body.userId));
    if (found) {
      const { data } = await this.axios.post("/posts", req.body);
      return res.status(201).send(data);
    }
    return res.sendStatus(400);

  }
}
