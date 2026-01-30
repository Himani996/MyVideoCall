


import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import { connectToSocket } from "./src/controllers/socketManager.js";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./src/routes/users.routes.js";

dotenv.config();

const app = express();

const server = createServer(app);

connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

app.get("/home", (req, res) => {
  res.json({ hello: "world" });
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 8000;


    server.listen(PORT, () => {
      console.log(`🚀 Server + Socket running on port ${PORT}`);
    });

  } catch (error) {
    console.error("DB Connection Failed ❌", error);
  }
};

import path from "path";

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});


start();
