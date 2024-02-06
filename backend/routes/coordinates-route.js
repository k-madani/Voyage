import * as coordinatesController from "../controllers/coordinates-controller.js";

import express from "express";

const router = express.Router();
router.route("/").get(coordinatesController.getCoordinates);

export default router;
