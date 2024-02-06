import * as milesController from "../controllers/miles-controller.js";

import express from "express";

const router = express.Router();
router.route("/").get(milesController.fetchMilePoints).put(milesController.updateMilePoints);

export default router;