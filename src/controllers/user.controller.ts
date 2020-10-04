import { Request, Response } from "express";
import type { AuthenticatedRequest } from "../middleware/authJwt";

const allAccess = (req: Request, res: Response) => {
  res.status(200).send("Public content");
};

const userBoard = (req: Request & AuthenticatedRequest, res: Response) => {
  res.status(200).send("user board");
};

const adminBoard = (req: Request, res: Response) => {
  res.status(200).send("admin board");
};

const moderatorBoard = (req: Request, res: Response) => {
  res.status(200).send("moderator board");
};

const controller = {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
};

export default controller;
