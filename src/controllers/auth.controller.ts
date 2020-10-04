import { Request, Response } from "express";
import db, { User, Role, Op } from "../models";
import AUTH_CONFIG from "../config/auth.config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ERROR_CODES, RESPONSE_CODES } from "tengja_shared_d";
import { RoleAttributes } from "../models/role.model";

interface UserSignup {
  username: string;
  email: string;
  password: string;
  roles?: RoleAttributes["name"][];
}

interface UserSignin {
  username: string;
  password: string;
}

const signup = (req: Request<{}, {}, UserSignup>, res: Response) => {
  const { username, email, password } = req.body;
  User.create({
    username,
    email,
    password: bcrypt.hashSync(password),
  })
    .then((user) => {
      const { roles } = req.body;
      if (roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: roles,
            },
          },
        })
          .then((roles) => user.setRoles(roles))
          .then(() =>
            res.send({
              code: RESPONSE_CODES.USER_CREATED_SUCCESSFULLY,
            })
          );
      } else {
        // 1 stands for pk 1 of the roles list, which is PRIVILEGE_LEVELS.user
        user.setRoles([1]).then(() =>
          res.send({
            code: RESPONSE_CODES.USER_CREATED_SUCCESSFULLY,
          })
        );
      }
    })
    .catch((err) =>
      res.status(500).send({
        code: ERROR_CODES.USER_CREATION_ERROR,
        message: err.message,
      })
    );
};

const signin = (req: Request<{}, {}, UserSignin>, res: Response) => {
  const { username, password } = req.body;
  User.findOne({
    where: {
      username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          code: ERROR_CODES.FAILED_LOGIN,
        });
      }
      const passIsValid = bcrypt.compareSync(password, user.password);
      if (!passIsValid) {
        return res.status(401).send({
          code: ERROR_CODES.FAILED_LOGIN,
        });
      }
      const accessToken = jwt.sign({ id: user.id }, AUTH_CONFIG.secret, {
        expiresIn: 24 * 60 * 60,
      });
      let roleNames: string[] = [];
      user.getRoles().then((roles) => {
        roleNames = roles.map((role) => `ROLE_${role.name}`);
      });
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: roleNames,
        accessToken,
      });
    })
    .catch((err) => {
      res.status(500).send({
        code: ERROR_CODES.FAILED_LOGIN,
        message: err.message,
      });
    });
};

const controller = {
  signup,
  signin,
};

export default controller;
