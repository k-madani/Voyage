import * as postOfferController from "../controllers/offers-controller.js";

import express from "express";

const router = express.Router();
router.route("/")
    .get(postOfferController.fetchOffers)
    .post(postOfferController.postOffers);

export default router;
