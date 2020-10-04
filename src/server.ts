require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import createError from "http-errors";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import expressWs from "express-ws";
import session from "express-session";
// import redis from "./redis";
import db from "./models";
import { PRIVILEGE_LEVELS } from "./constants";

const { NODE_ENV } = process.env;
const { app } = expressWs(express());
const Role = db.Role;

// Routes need to come after the websocket wrapper implementation
import indexRouter from "./routes/index";
import websocketRouter from "./routes/websocket";
import restRouter from "./routes/rest";

if (NODE_ENV === "development") {
  db.sequelize.sync({ force: true }).then(() => {
    initial();
  });

  function initial() {
    Role.create({
      id: 1,
      name: PRIVILEGE_LEVELS.user,
    });

    Role.create({
      id: 2,
      name: PRIVILEGE_LEVELS.moderator,
    });

    Role.create({
      id: 3,
      name: PRIVILEGE_LEVELS.admin,
    });
  }
} else {
  db.sequelize.sync();
}

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const RedisStore = require("connect-redis")(session);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/ws", websocketRouter);
app.use("/rest", restRouter);

// 404 catch and forward
app.use((req, res, next) => {
  next(createError(404));
});
// // error handler
// app.use((err, req, res, next) => {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get("env") === "development" ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render("error");
// });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on: ${PORT}`);
});

export default app;
