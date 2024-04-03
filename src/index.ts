import { AppDataSource } from "./data-source";
import * as express from "express";
import { Request, Response } from "express";
import { errorHandler } from "./middlewares/error.middleware";
import "reflect-metadata";
import * as dotenv from "dotenv";
import { userRouter } from "./routes/user.router";
import { bookRouter } from "./routes/book.router";
dotenv.config();

const app = express();
app.use(express.json());
app.use(errorHandler);
const { PORT = 3012 } = process.env;

app.use("/auth", userRouter);
app.use("/api", bookRouter);

app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));