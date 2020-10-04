import middleware from "../middleware";
import controller from "../controllers/auth.controller";
import { Express, Request, Response, NextFunction } from "express";

export const auth = (app: Express) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/signup", [
    middleware.verifySignup.checkDuplicateAuth,
    middleware.verifySignup.checkRolesValid,
  ]);

  app.post("/api/auth/signin", controller.signin);
};
