import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import { useLocation } from "react-router-dom";


const Payment: React.FC = () => {
    const location = useLocation();
    console.log(location)
    const flightDetail = location.state as any;
    console.log(flightDetail);
    const handle = async () => {
        const stripe = await loadStripe("pk_test_51OMKOULDk2U4kXApl6nvMPcovgXL6YZqollr8aaH2dx2GCk8VEACFfWQGNXXLGmtUatMOXyh0XJ2JbqeGrCTEAJ500IDyR8NaV");
        const flight = [{
            price: flightDetail?.totalAmount,
            airlines: flightDetail.legs[0].segments ? flightDetail.legs[0].segments[0].carriers.carrierName : flightDetail.legs[0].carriers.carrierName,
            image: flightDetail.legs[0].segments ? flightDetail.legs[0].segments[0].carriers.carrierLogoUrl : flightDetail.legs[0].carriers.carrierLogoUrl,
            quantity: 1
        }]
        const body = {
            products: flight
        }
        const headers = {
            "Content-Type":"application/json"
        }

        const response = await fetch(`http://localhost:4000/checkout`,{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        })
        const session = await response.json();

        const result = stripe?.redirectToCheckout({
            sessionId:session.id
        });
        if((await result)?.error){
            console.log("error");
            alert("Error");
        }
    }

    useEffect(() => {
        handle();
      }, []);
    
    

  return (
   <></>
  );
}

export default Payment;