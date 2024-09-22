import express from "express";
import {
  ClientLogin,
  ClientRegister,
  DeleteClient,
  GetAllClients,
  GetMe,
  UpdateClient,
} from "../controllers/client.js";
import isExisted from "../middlewares/isExisted.js";
import IsAdmin from "../middlewares/IsAdmin.js";

const router = express.Router();

router.get("/", isExisted, IsAdmin, GetAllClients);
router.post("/register", ClientRegister);
router.post("/login", ClientLogin);
router.put("/:id", isExisted, UpdateClient);
router.delete("/:id", isExisted, DeleteClient);
router.get("/me", isExisted, GetMe);

export default router;
