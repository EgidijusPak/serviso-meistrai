import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // allow frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // this is the fix
  })
);
app.use(express.json());

app.use("/api/customers", userRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    })
  )
  .catch((err) => console.error("MongoDB connection error:", err));
