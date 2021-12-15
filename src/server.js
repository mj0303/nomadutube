// express application생성 > 서버 관련 코드 작성 > 서버 열기 (app.listen())
// import express from "express" == const express = require("express");
import express, { response } from "express";

const PORT = 4000;
// create express application. the name "app" is convention. it doens't need to be "app".
// expree와 연관된 코드는 express application이 만들어진 뒤 작성해야 한다. 즉 아래코드 밑에 작성을 해야 함.
const app = express();

// app.get("경로(route)", callback);
// 누군가 경로(route)로 get reqeust를 보낸다면 실행할 callback function을 정의
// 여기서 /는 root경로를 의미
// js에서 button.addEventlister("click", callback)에서 callback함수를 호출할 때 브라우저가 자동으로 event객체를 callback함수에 넘겨주듯이
// request객체와 response객체를 express가 자동으로 넘겨준다.
// request를 끝내는 방법은 여러가지다. res.end(), res.send("message"), etc...
// app.get("route", function1, function2, ..) function1에서 next argument를 불러와서 next()로 function2를 실행시킬 수 있다.
// 여기서 function1은 middleware(middle software)라고 불림
const logger = (req, res, next) => {
   console.log(`${req.method}: ${req.url}`);
   next();
}
const privateMiddleware = (req, res, next) => {
   const url = req.url;
   if(url === "/protected") {
      next();
   } else {
      next();
   }
}
const handleHome = (req, res) => {
   return res.send("END zz");
}
const handleProtected = (req, res) => {
   return res.send("This is private lounge.");
}

// app.use()는 global middleware를 만들어 준다. 순서 중요 use > get (express는 js처럼 위에서 아래로 코드를 실행시키기 때문이다.)
// 즉 모든 route에서 logger를 사용할 수 있게 된다.
// 즉, next()를 써서 다음 함수로 연결을 도와주는 것들을 middleware라고 할 수 있다.
app.use(logger);
app.use(privateMiddleware);
app.get("/", handleHome);
app.get("/protected", handleProtected);

// request를 들을 함수 작성
const handleListening = () => {
   console.log(`Server listening on port ${PORT}. 🐙`);
}
app.listen(PORT, handleListening);