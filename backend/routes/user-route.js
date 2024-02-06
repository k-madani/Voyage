import * as userController from "../controllers/user-controller.js";
import express from "express";

const router = express.Router();

router.route("/").get(userController.getUser);

router
  .route("/:id")
  .delete(userController.removeUser)
  .put(userController.updateUser);

export default router;
