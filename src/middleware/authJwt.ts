import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AUTH_CONFIG from "../config/auth.config";
import { User } from "../models";
import { ROLES } from "../constants";
import { ERROR_CODES } from "tengja_shared_d";

export interface AuthenticatedRequest {
  userId: number;
}

export interface DecodedJwt {
  id: number;
}

const verifyToken = (
  req: Request & AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { accessToken } = req.headers as { [k: string]: string };

  if (!accessToken) {
    return res.status(403).send({
      code: ERROR_CODES.NO_ACCESS_TOKEN_PROVIDED,
    });
  }

  jwt.verify(accessToken, AUTH_CONFIG.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        code: ERROR_CODES.UNAUTHORIZED_ACCESS,
      });
    }
    req.userId = (decoded as DecodedJwt).id;
    next();
  });
};

const isAdmin = (
  req: Request & AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  User.findByPk(req.userId).then((user) => {
    user?.getRoles().then((roles) => {
      roles.forEach((role) => {
        if (role.name === ROLES.admin) {
          next();
          return;
        }
      });
      res.status(403).send({
        code: ERROR_CODES.REQUIRES_ADMIN_ROLE,
      });
    });
  });
};

const isModerator = (
  req: Request & AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  User.findByPk(req.userId).then((user) => {
    user?.getRoles().then((roles) => {
      roles.forEach((role) => {
        if (role.name === ROLES.moderator) {
          next();
          return;
        }
      });
      res.status(403).send({
        code: ERROR_CODES.REQUIRES_MODERATOR_ROLE,
      });
    });
  });
};

const isModeratorOrAdmin = (
  req: Request & AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { admin, moderator } = ROLES;
  User.findByPk(req.userId).then((user) => {
    user?.getRoles().then((roles) => {
      roles
        // get only the names of roles
        .map((role) => role.name)
        .forEach((roleName) => {
          // Checks if any of the roleNames is moderator or admin
          if ([admin, moderator].some((r) => r === roleName)) {
            next();
            return;
          }
        });
      res.status(403).send({
        code: ERROR_CODES.REQUIRES_MODERATOR_OR_ADMIN_ROLE,
      });
    });
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
};

export default authJwt;
