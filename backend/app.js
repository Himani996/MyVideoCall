import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "node:http";
import mongoose from "mongoose";
import { connectToSocket } from "./src/controllers/socketManager.js";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./src/routes/users.routes.js";

dotenv.config();

const app = express();
const server = createServer(app);

// 🔹 __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 Socket.io attach
connectToSocket(server);

// 🔹 Middlewares
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// 🔹 API Routes
app.use("/api/v1/users", userRoutes);

// Example test route
app.get("/home", (req, res) => {
  res.json({ hello: "world" });
});

// 🔹 React frontend serve
app.use(express.static(path.join(__dirname, "dist")));

// 🔹 Wildcard route (Express v5 safe)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// 🔹 Start server + DB
const start = async () => {
  try {
    await mongooise.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 8000;

    server.listen(PORT, () => {
      console.log(`🚀 Server + Socket running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ DB Connection Failed", error);
  }
};

start();
