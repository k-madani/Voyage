import { createBooking, fetchBookingById } from "../services/bookings-service.js";
import {updateMilePoints} from './miles-controller.js';
import { setResponse, setErrorResponse } from "./response-handler.js";
import * as subs from "../controllers/subscriber-controller.js";

export const bookFlights = async (request, response) => {
    try {
        const body = request.body;
        const booking = await createBooking(body);
        const total = body.fare;
        var user = {};

        if(!total.miles){
            user =  await updateMilePoints(request,response);
        }
        
        const date = Date.now();

      const msgContent =
        `<div style="max-width: 600px; margin: 0 auto; background-color: #dff0d8; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 128, 0, 0.1);">
        <h2 style="color: #3c763d;">Payment Successful!</h2>
        <p>Your payment has been processed successfully. Thank you for your purchase.</p>
        <p>Transaction Details:</p>
        <ul>
            <li><strong>Order ID:</strong> ${booking._id}</li>
            <li><strong>Amount Paid:</strong> ${body.fare.finalAmountValue}</li>
            <li><strong>Date:</strong> ${date}</li>
        </ul>
        <p>Thank you for choosing our services. We appreciate your business!</p>
        <p style="font-size: 12px; color: #777;">This is an automated confirmation email. Please do not reply.</p>
        </div>`;

 
      subs.sendEmail([user.email], "booking", msgContent);

        setResponse(booking, user);
    } catch (err) {
        setErrorResponse('500',err, response);
    }
}

export const getBookingById = async (request,response) => {
    try{
        const params = request.params;
        const flightDetails = await fetchBookingById(params.id);
        setResponse(flightDetails,response);
    } catch (err){
        setErrorResponse('500',err,response);
    }
}

export const updatePayment = async (request,response) => {
    try{
        const params = {...request.body};
        // const updatedBooking = await 

    }catch(err){
        setErrorResponse('500',err,response);
    }
}
