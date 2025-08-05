import express from "express";
import http from "http";
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import dotenv from "dotenv";
import { connectDB } from './lib/db.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import path from "path";
import { Server } from "socket.io";

const __dirname = path.resolve();
dotenv.config();

const app = express();
const server = http.createServer(app); // Moved here

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const port = process.env.PORT || 5001;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Now your routes will be listed
console.log("✅ ROUTES LOADED:");
console.log(listEndpoints(app));


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.get("/test", (req, res) => {
  res.send("Test route working!");
});

connectDB();

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Optional: Export io if needed elsewhere
export { io };
