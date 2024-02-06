import * as subscriberController from "../controllers/subscriber-controller.js";

import express from "express";

const router = express.Router();

router.route("/").post(subscriberController.addSubs)
router.route("/:type").post(subscriberController.sendNotifications);

export default router;
