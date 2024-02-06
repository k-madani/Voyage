import * as flightsController from "../controllers/flights-controller.js";

import express from "express";

const router = express.Router();
router.route("/").post(flightsController.fetchFlights);

export default router;
