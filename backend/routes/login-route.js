import * as loginController from "../controllers/login-controller.js";

import express from "express";

const router = express.Router();
router.route("/").post(loginController.login);

export default router;
