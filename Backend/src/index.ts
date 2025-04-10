import express from "express";
import mainRouter from "./routes/mainRouter";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const PORT = 3000;

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/api", mainRouter);

app.listen(PORT, () => {
  console.log(`Your port is runnnign at port ${3000}`);
});
