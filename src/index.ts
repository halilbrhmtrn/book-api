import { AppDataSource } from "./data-source";
import * as express from "express";
import { Request, Response } from "express";
import { errorHandler } from "./middlewares/error.middleware";
import "reflect-metadata";

const app = express();
app.use(express.json());
app.use(errorHandler);
const { PORT = 3012 } = process.env;

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