import { getMiles, updateMiles } from "../services/miles-service.js";
import { setResponse, setErrorResponse } from "./response-handler.js";

export const fetchMilePoints = async (request, response) => {
    try {
        const { id, type } = request.decodedToken;
        const userMiles = await getMiles(id);
        setResponse({ ...userMiles, userType: type }, response);
    } catch (err) {
        setErrorResponse('500', err, response);
    }
}

export const updateMilePoints = async (request, response) => {
    try {
        let params;
        let userType = '';
        const { id, type } = request.decodedToken;
        const body = request.body;
        const milePoints = calculateMilePoints(body.fare, type);

        if (milePoints > 1500) {
            userType = "adventurer";
            params = { milePoints, userType };
        }

        params = { milePoints }
        const updatedUser = await updateMiles(id, params);
        return updatedUser;
    } catch (err) {
        setErrorResponse('500', err, respone);
    }
}

const calculateMilePoints = (bookingTotal, type) => {
    let points;
    const total = bookingTotal.finalAmountValue;
    if (type === "voyager") {
        points = Math.floor((total * 7) / 100);
    } else {
        points = Math.floor((total * 10) / 100);
    }

    return points;
}