import express from "express";
import cors from "cors";
import { dashxRouter } from "./routes/dashx.routes";
// import taskRouter from './routes/task.routes';
// import LoggerMiddleware from "./middleware/root/logger.middleware";
// import AuthRouter from './routes/auth.routes';
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// app.use("/api/task", taskRouter)
// app.use(LoggerMiddleware);
// app.use("/auth", AuthRouter)

app.use("/dashx", dashxRouter);
export default app;
