import express from "express";
import ROUTES from "./constants/routes";
import calculationHandler from "./renders/calculationHandler";
import projectionHandler from "./renders/projectionHandler";

const app = express();

app.set("port", process.env.PORT || 3001);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Adding this so I can run server and client on localhost
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get(ROUTES.API.CALCULATIONS.BASE, calculationHandler);
app.get(ROUTES.API.CALCULATIONS.PROJECTED, projectionHandler);

export default app;
