import express from "express";
import { ConnectMongoDB } from "../DataBase/ConnectMongoDB.js";
import { AuthRouter } from "../router/AuthRouter.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { TodoRoute } from "../router/TodoRouter.js";

const app = express();
const port = 1196;

ConnectMongoDB();

app.use(morgan("dev")).use(bodyParser.json()).use(cookieParser()).use(cors());

app.use("/auth", AuthRouter);
app.use("/todo", TodoRoute);

app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
