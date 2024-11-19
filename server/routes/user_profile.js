import express from "express";
import ProfileController from "../controllers/user_profile.js";

const router = express.Router();

router.get("/:id", ProfileController.getProfile);
router.patch("/:id", ProfileController.updateProfile);

export default router;