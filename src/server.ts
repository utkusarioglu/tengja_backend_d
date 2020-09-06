import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import expressWs from 'express-ws';
import session from 'express-session';

const { app, getWss, applyTo } = expressWs(express());

import indexRouter from './routes/index';
import restRouter from './routes/rest';
import websocketRouter from './routes/websocket';



// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");




app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: ['veryimportantsecret'],  
    name: "secretname",
    cookie: {
        httpOnly: false,
        secure: false,
        sameSite: false,
        maxAge: 600000 // Time is in miliseconds
    },
    saveUninitialized: false,
    resave: false,
}));

app.use("/", indexRouter);
app.use("/rest", restRouter);
app.use("/ws", websocketRouter);

// catch 404 and forward to error handler
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

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is listening on: ${PORT}`);
});


export default app;