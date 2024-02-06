import { searchFlights, searchAirports } from "../services/flights-service.js";
import { setResponse } from "./response-handler.js";
import { setErrorResponse } from "./response-handler.js";

export const fetchFlights = async (request, response) => {
  try {
    const params = { requestquery: request.body };
    const flights = await searchFlights(params.requestquery);
    setResponse(flights, response);
  } catch (e) {
    setErrorResponse("500", e, response);
  }
};

export const fetchAirports = async (request, response) => {
  try {
    const params = { location: request.query };
    const airports = await searchAirports(params.location.query);
    setResponse(airports, response);
  } catch (e) {
    setErrorResponse("500", e, response);
  }
};
