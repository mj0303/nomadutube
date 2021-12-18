// express application생성 > 서버 관련 코드 작성 > 서버 열기 (app.listen())
// import express from "express" == const express = require("express");
import express, { response } from "express";
// morgan은 middleware인데 method, path, statuscode, 로딩시간 등등을 console 해준다.
import morgan from "morgan";
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';

const PORT = 4000;
// create express application. the name "app" is convention. it doens't need to be "app".
// expree와 연관된 코드는 express application이 만들어진 뒤 작성해야 한다. 즉 아래코드 밑에 작성을 해야 함.
const app = express();

const logger = morgan("dev");
app.use(logger);
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

// request를 들을 함수 작성
const handleListening = () => {
   console.log(`✅ Server listening on port ${PORT}. 🐙`);
}
app.listen(PORT, handleListening);