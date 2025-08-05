import path from "path";
import express from "express";
import authRuotes from "./routes/authroutes.js";
import userRoutes from "./routes/userRoutes.js";
import postroutes from "./routes/postroutes.js";
import notificationroutes from "./routes/notificationroutes.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import connectMongoDb from "./db/connectMongoDb.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
connectMongoDb(); // ✅ Connect DB immediately

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ API Routes
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});
app.use("/api/auth", authRuotes);
app.use("/api/users", userRoutes);
app.use("/api/post", postroutes);
app.use("/api/notifications", notificationroutes);

// ✅ Serve frontend if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// ❌ REMOVE app.listen(PORT)
// ✅ INSTEAD export handler for Vercel
export default app;
