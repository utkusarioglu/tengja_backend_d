import { Express, Request, Response, NextFunction } from "express";
import middleware from "../middleware";
import controller from "../controllers/user.controller";
import { AuthenticatedRequest } from "../middleware/authJwt";

export const userRoutes = (app: Express) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);
  app.get(
    "/api/test/user",
    [middleware.authJwt.verifyToken],
    controller.userBoard
  );
};
