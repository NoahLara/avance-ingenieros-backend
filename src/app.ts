import express from "express";
import morgan from "morgan";
import cors from "cors";

import userRoutes from "./routes/users.routes";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(express.json());

app.use(morgan("dev"));
app.use(cors());

app.use(userRoutes);
app.use(authRoutes);

export default app;
