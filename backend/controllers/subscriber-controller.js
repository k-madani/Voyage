import * as subsService from "../services/subscribers-service.js";
import { setErrorResponse, setResponse } from "./response-handler.js";
import sgMail from '@sendgrid/mail';


export const sendEmail = async (emails, subscriptionType,msgContent) => {
    sgMail.setApiKey("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");
    console.log(emails);
    var sub = "";
    if(subscriptionType === "subscription"){
        sub = "Voyage Subscritpion"
    } else if(subscriptionType === "offers"){
        sub = "New Offers Created. Go Avail Before It Ends"
    }
    else if(subscriptionType === "notifications"){
        sub = "Voyage notifications for you!!"
    } else {
        sub = "Updates from Voyage"
    }
    for (const email of emails) {
        const msg = {
          to: email,
          from: 'arpithabht12@gmail.com',
          subject: sub, 
          html: msgContent
        };
    
        try {
          const response = await sgMail.send(msg);
          console.log(response);
        } catch (error) {
          console.error(error);
    
          if (error.response) {
            console.error(error.response.body);
          }
        }
      }
}


// add subscribers
export const addSubs = async (request, response) => {
    try {
        const params = { ...request.body };
        const { email, type } = params;
        // // validation
        // if (!email && email === null && email.trim() === '') {
        //     setErrorResponse('400', 'Invalid Email', response);
        // }

        // if (!type && type === null && type.trim() === '' && !type.includes['subscriber', 'voyager', 'adventurer']) {
        //     setErrorResponse('400', 'Invalid type', response);
        // }

        const subs = await subsService.createSubscriber({ email, type });
        const msg = '<div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">'
        +'<h2 style="color: #007bff;">Subscription Successful!</h2>'
        +'<p>You have successfully subscribed to the Voyage Newsletter. Welcome aboard!</p>'
        +'<p>Stay tuned for the latest travel deals and updates straight to your inbox.</p>'
        +'<p>Thank you for choosing Voyage!</p>'
        +'<p style="font-size: 12px; color: #777;">This is an automated email. Please do not reply.</p></div>'
        sendEmail([params.email],"subscription",msg);
        setResponse(subs, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
};

// send emails to subscribers
export const sendNotifications = async (request, response) => {
    try {
        const { type } = request.params;
        const { notifications, offers } = request.body;
        const allSubs = await subsService.getSubscribers();
        const filteredSubs = allSubs.filter(sub => sub.type.toLowerCase() === type);

        if (notifications) {
            sendEmail(filteredSubs,"notifications",msg);
            // send notification email
        } else {
            sendEmail(filteredSubs,"offers",msg);
            // send offers notification email
        }

        setResponse({ message: "Notification sent successfully." }, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}