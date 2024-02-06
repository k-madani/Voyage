import { bookFlights } from "../controllers/booking-controller.js";
import express from "express";

const router = express.Router();
router.route("/").post(bookFlights);

export default router;
