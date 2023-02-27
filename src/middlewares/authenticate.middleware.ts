import { NextFunction, Request, Response } from "express";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.header("user_id");
  if (parseInt(userId || "0") !== 1) return res.sendStatus(403)
  next();
}