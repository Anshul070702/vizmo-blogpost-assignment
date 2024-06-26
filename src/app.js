import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
const app = express();

// Setting Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());

// routes
import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";

// routes declaration
app.use("/api/v1/user", userRouter); // User Routes
app.use("/api/v1/blog", blogRouter); // Blog Routes

// http://localhost:8000/api/v1/user/register

export { app };
