import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { FRONTEND_URL } from "./config/config.js";
import { errorMiddleware } from "./middlewares/error.js";
import { notfoundMiddleware } from "./middlewares/notfound.js";
import { userAuth } from "./middlewares/auth.js";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRouter from "./routes/request.js";
import userRouter from "./routes/user.js";
import healthRouter from "./routes/health.js";
import messageRouter from "./routes/message.js";
import tripRoutes from "./routes/trip.routes.js";
import http from "http";
import { initializeSocket } from "./utils/socket.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Basic middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST", "PATCH", "PUT"]
    })
);

// Create a separate router for public routes
const publicRouter = express.Router();
publicRouter.use("/trip", tripRoutes);
publicRouter.use("/health", healthRouter);
publicRouter.use("/auth", authRouter);

// Create a separate router for protected routes
const protectedRouter = express.Router();
protectedRouter.use("/profile", userAuth, profileRouter);
protectedRouter.use("/request", userAuth, requestRouter);
protectedRouter.use("/user", userAuth, userRouter);
protectedRouter.use("/message", userAuth, messageRouter);

// Mount the routers
app.use("/api", publicRouter);
app.use("/api", protectedRouter);

// Error handling
app.use(errorMiddleware);
app.use(notfoundMiddleware);

const server = http.createServer(app);
initializeSocket(server);
export { app, server };
