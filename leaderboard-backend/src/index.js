// src/index.js
import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/User.js";
import Claim from "./models/Claim.js";
import { seedUsers } from "./seedUsers.js";

dotenv.config();
const app = express();
const httpServer = http.createServer(app);
const io = new SocketIOServer(httpServer, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// helpers
const randomPoints = () => Math.floor(Math.random() * 10) + 1;
const broadcastLeaderboard = async () => {
  const board = await User.find().sort({ points: -1 }).lean();
  io.emit("leaderboard", board);
};

// REST -----------------------------------
app.get("/api/users", async (_req, res) => {
  const users = await User.find().sort({ name: 1 });
  res.json(users);
});

app.post("/api/users", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ msg: "Name required" });
  const user = await User.create({ name });
  await broadcastLeaderboard();
  res.status(201).json(user);
});

app.post("/api/claim", async (req, res) => {
  const { userId } = req.body;
  const pts = randomPoints();
  const user = await User.findByIdAndUpdate(
    userId,
    { $inc: { points: pts } },
    { new: true }
  );
  if (!user) return res.status(404).json({ msg: "User not found" });
  await Claim.create({ user: userId, points: pts });
  await broadcastLeaderboard();
  res.json({ user, pointsAwarded: pts });
});

app.get("/api/history", async (_req, res) => {
  const history = await Claim.find()
    .populate("user", "name")
    .sort({ createdAt: -1 })
    .lean();
  res.json(history);
});

// sockets --------------------------------
io.on("connection", async (socket) => {
  console.log("⚡ client connected");
  const board = await User.find().sort({ points: -1 }).lean();
  socket.emit("leaderboard", board);
});

// DB + start -----------------------------
(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await seedUsers();
  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () =>
    console.log(`🚀 server listening on http://localhost:${PORT}`)
  );
})();
