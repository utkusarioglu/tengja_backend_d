import { Request, Response, NextFunction } from "express";
import db from "../models";
import { ERROR_CODES } from "../constants";

const { ROLES, User } = db;

const checkDuplicateAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email } = req.body;
  User.findOne({
    where: {
      username,
    },
  }).then((user) => {
    if (user) {
      // !TODO this won't be the api response as we will be using websockets
      res.status(400).send({
        code: ERROR_CODES.USERNAME_TAKEN,
      });
      return;
    }
  });

  User.findOne({
    where: {
      email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        code: ERROR_CODES.EMAIL_TAKEN,
      });
      return;
    }
  });

  next();
};

const checkRolesValid = (req: Request, res: Response, next: NextFunction) => {
  req.body.roles?.forEach((role: string) => {
    if (!ROLES.includes(role)) {
      // !TODO this won't be the api response as we will be using websockets
      res.status(400).send({
        code: ERROR_CODES.ROLE_NOT_VALID,
        params: {
          role,
        },
      });
      return;
    }
  });

  next();
};

const verifySignup = {
  checkDuplicateAuth,
  checkRolesValid,
};

export default verifySignup;
