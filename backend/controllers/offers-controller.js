import * as offersService from "../services/offers-service.js";
import { validateOffers } from "../validate/validation.js";
import * as subsService from "../services/subscribers-service.js";
import * as subs from "../controllers/subscriber-controller.js";

import { setErrorResponse, setResponse } from "./response-handler.js";

export const postOffers = async (request, response) => {
  try {
    const { offerName, offerValue, userType } = { ...request.body };

    // validate offers
    const validatedResult = validateOffers({ offerName, offerValue, userType });
    if (Object.keys(validatedResult).length() === 0) {
      const offer = await offersService.offers({
        offerName,
        offerValue,
        userType,
        createdDate,
      });

      const subscribers = await subsService.getSubscribers();
      const filteredSubs = subscribers.filter(
        (sub) => sub.type === userType.toLowerCase()
      );

      const msgContent =
        `<div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">` +
        `<h2 style="color: #007bff;">New Offer Alert!</h2>` +
        `<p>We have a new offer for you: ${offerName}</p>` +
        `<p>Offer Value: ${offerValue}</p>` +
        `<p>Stay tuned for more exciting offers!</p>` +
        `<p style="font-size: 12px; color: #777;">This is an automated email. Please do not reply.</p></div>`;

      const subscriberEmails = filteredSubs.map(
        (subscriber) => subscriber.email
      );
      subs.sendEmail(subscriberEmails, "offers", msgContent);

      setResponse(offer, response);
    }
  } catch (e) {
    setErrorResponse(e, response);
  }
};

export const fetchOffers = async (request, response) => {
  try {
    // fetch query params
    const { type } = request.query;
    const offers = await offersService.getOffers();

    const filteredOffers = offers.filter(offer => offer.userType.toLowerCase() === type);

    setResponse(filteredOffers, response);
  } catch (e) {
    // TODO: Check and add the valid status codes.
    setErrorResponse("500", e, response);
  }
};
