import getCityCoordinates from "../services/coordinates-service.js";
import { setResponse } from "./response-handler.js";
import { setErrorResponse } from "./response-handler.js";

export const getCoordinates = async (request, response) => {
  try {
    const params = request.query.travelledCities;
    const coordinates = await getCityCoordinates(params);
    setResponse(coordinates, response);
  } catch (e) {
    setErrorResponse('500',e, response);
  }
};
