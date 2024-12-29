import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import methodOverride from "method-override"
import cookieParser from "cookie-parser"
import * as database from "./config/database";
import clientRoutes from "./routes/client/index.route"
dotenv.config();
database.connect();
const app: Express = express();
const port: number | string = process.env.PORT || 3000;
app.set("views", "./views");
app.set("view engine", "pug");
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"));
app.use(cookieParser());
clientRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
