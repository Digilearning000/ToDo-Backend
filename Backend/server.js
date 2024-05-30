import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./db/db.js";

dotenv.config();

const app = express();

connectDb();

app.use(
  cors({
    origin: "http://localhost:5173/",
  })
);
app.use(express.json());

//Routes

import taskRouter from "./routes/taskRoutes.js";
import userRouter from "./routes/userRoutes.js";

app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
