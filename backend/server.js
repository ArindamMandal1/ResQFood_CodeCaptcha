import http from "http";
import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import { Server } from "socket.io";
import { initSocket } from "./src/socket/socketHandler.js";

connectDB();

const server = http.createServer(app);

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
].filter(Boolean);

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
  pingTimeout: 60000,
  pingInterval: 25000,
});

initSocket(io);
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", socket.id, "reason:", reason);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export { io };