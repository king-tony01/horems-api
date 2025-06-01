import "./config/config.js";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import patientRoutes from "./routes/patients.route.js";
import staffRoutes from "./routes/staff.route.js";
import resourceRoutes from "./routes/resource.route.js";
import authRoutes from "./routes/auth.route.js";
import overviewRoutes from "./routes/overview.route.js";

const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/patients", patientRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/overview", overviewRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("HOREMS API is running.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
