import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import path from "path"; // Path modulini import qilish

import ClientRoutes from "../admin/routes/client.js";
import AdminRoutes from "../admin/routes/admin.js";
import ProductRoutes from "../admin/routes/product.js";
import ChatRoutes from "../admin/routes/chat.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Statik fayl sifatida uploads papkasini xizmat ko'rsatish
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.post("/upload", upload.array("photos"), async (req, res) => {
  const uploadedImages = req.files.map(
    (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
  );
  res.status(200).json({
    message: "Изображения успешно загружены!",
    photos: uploadedImages,
  });
});

app.get("/", (_, res) => res.send("Hello world!"));

app.use("/admin", AdminRoutes);
app.use("/client", ClientRoutes);
app.use("/product", ProductRoutes);
app.use("/chat", ChatRoutes);

const startApp = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(process.env.PORT, () =>
      console.log(`Server is running on http://localhost:${process.env.PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startApp();
