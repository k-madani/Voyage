import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { NavigateOptions, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

interface BookingPaymentProps {
  personalInfo: any;
  state: any;
}

interface Offer {
  id: string;
  couponCode: string;
  discountValue: string;
}

interface userDetails {
  id: string;
  token: string;
  type: string;
}

const PaymentDetails: React.FC<BookingPaymentProps> = ({
  personalInfo,
  state,
}) => {
  const userState: userDetails | null = useSelector(
    (state: RootState) => state.user
  );
  // Convenience fee and tax
  const navigate = useNavigate();
  const price = state.price.raw;
  const convenienceFee = 5;
  const taxPercentage = 10; // Assuming a 10% tax rate, adjust as needed

  // Calculate total including convenience fee and tax
  const orgTotalAmount = price + convenienceFee + (price * taxPercentage) / 100;
  let [totalAmount, setTotalAmount] = useState<number>(orgTotalAmount);
  //const totalAmount = price + convenienceFee + (price * taxPercentage) / 100;
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [invalidCouponError, setInvalidCouponError] = useState<string>(""); // State to manage the error message
  const [userMilesError, setUserMilesError] = useState<string>(""); // State to manage the error message
  const [discountedPrice, setDiscountedPrice] = useState<string>("");
  const [discountedMilePrice, setDiscountedMilePrice] = useState<number>();

  const [userMilePoints, setUserMilePoints] = useState<string>("");

  const onClickApplyMiles = () => {
    if (parseInt(userMilePoints) < 500) {
      setUserMilesError("Mile points should be more than 500 to redeem.");
    } else {
      if (userState.type === "voyager") {
        let usableMilePoints = parseInt(userMilePoints) * 0.15;
        setDiscountedMilePrice(usableMilePoints);
        setTotalAmount(totalAmount - usableMilePoints);
      } else if (userState.type === "adventurer") {
        let usableMilePoints = parseInt(userMilePoints) * 0.2;
        setDiscountedMilePrice(usableMilePoints);
        setTotalAmount(totalAmount - usableMilePoints);
      }
    }
  };
  const onClickApplyCoupon = () => {
    const enteredCouponCode = couponCode.trim(); // Trim to remove leading/trailing whitespaces
    if (enteredCouponCode === "") {
      console.log("Please enter a coupon code.");
      setTotalAmount(orgTotalAmount);
      return;
    }
    const validOffer = filteredOffers.find(
      (offer) => offer.couponCode === enteredCouponCode
    );

    if (validOffer) {
      // Convert discountValue to a number before multiplying
      const discountValueAsNumber = parseFloat(validOffer.discountValue);

      if (!isNaN(discountValueAsNumber)) {
        setTotalAmount(orgTotalAmount * (1 - discountValueAsNumber / 100));
        setDiscountedPrice(
          `Discount Amount :${Math.round(
            totalAmount - orgTotalAmount * (1 - discountValueAsNumber / 100)
          )}`
        );
      } else {
        console.error(
          "Invalid discount value. Please check the offer configuration."
        );
        setInvalidCouponError("An error occurred. Please try again."); // Set a generic error message
      }
    } else {
      console.log("Invalid coupon code. Please check and try again.");
      setInvalidCouponError("Invalid coupon code. Please check and try again."); // Set the specific error message
    }
  };

  useEffect(() => {
    var userId = "";
    var userToken = "";
    var type = "";
    console.log(userState);
    if (userState != null) {
      userId = (userState as userDetails).id;
      userToken = (userState as userDetails).token;
      type = (userState as userDetails).type;
      console.log(userToken);
    }
    axios
      .get(`http://localhost:4000/miles`, {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setUserMilePoints(response.data.milePoints);
      });
    // Make an API call to fetch offers when the component mounts
    axios
      .get(`http://localhost:4000/offers?type=${type}`, {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      }) // Replace with your actual API endpoint
      .then((response) => {
        // Filter offers created in the last 14 days
        const currentDate = new Date();
        const filteredOffers = response.data.filter((offer: any) => {
          const offerDate = new Date(offer.createdDate);
          const daysDifference = Math.floor(
            (currentDate.getTime() - offerDate.getTime()) /
              (1000 * 60 * 60 * 24)
          );
          return daysDifference <= 14;
        });

        // Map API response to the Offer interface
        const mappedOffers: Offer[] = filteredOffers.map((offer: any) => ({
          id: offer._id,
          couponCode: offer.offerName,
          discountValue: offer.offerValue,
        }));
        setFilteredOffers(mappedOffers);
      })
      .catch((error) => {
        console.error("Error fetching offers:", error);
      });
  }, []);

  const paymentInformation = {
    finalAmountValue: totalAmount,
    baseFare: price,
    convenienceFee: price * 0.05,
    tax: price * 0.1,
    couponApplied: couponCode,
    milesRedeemed: discountedMilePrice,
  };

  const onClickBookNow = async () => {
    var userId = "";
    var userToken = "";
    var type = "";
    console.log(userState);
    if (userState != null) {
      userId = (userState as userDetails).id;
      userToken = (userState as userDetails).token;
      type = (userState as userDetails).type;
      console.log(userToken);
    }
    const navigateOptions: NavigateOptions = {
      state: {
        ...state,
        personalInfo,
        paymentInformation,
      },
    };
    const obj: any = {
      source: state?.flightItinerary.sourceCity,
      destination: state?.flightItinerary.destinationCity,
      departure: state?.flightItinerary.departureDateTime,
      arrival: state?.flightItinerary.returnDateTime,
      totalDuration: state?.flightItinerary.totalTravelDuration,
      userDetails: {
        userId: userState.id,
      },
      fare: paymentInformation,
      payment: "PENDING"
    }
    console.log(obj);
    axios.post("http://localhost:4000/booking",obj,{
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    }).then((response) => {
      console.log(response);
    }
    ).catch((error) => {
      console.error("Error sending booking details:", error);
    })
    let tempState = state;
    state['totalAmount'] = paymentInformation?.finalAmountValue;
    console.log(tempState);
    navigate("/payment", {
      state:tempState});
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Payment Details
        </Typography>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              Flight Price: ${price.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              Convenience Fee: ${convenienceFee.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              Tax ({taxPercentage}%): $
              {(price * (taxPercentage / 100)).toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="couponCode"
              label="Coupon Code"
              name="couponCode"
              onChange={(e) => {
                setCouponCode(e.target.value);
                setInvalidCouponError(""); // Reset the error message when the user types
              }}
            />
            <button className="btn-apply-coupon" onClick={onClickApplyCoupon}>
              Apply Coupon
            </button>
            <Typography variant="body2" color="error">
              {invalidCouponError}
            </Typography>
            <Typography variant="body2" color="primary">
              {discountedPrice}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              Mile points available: ${userMilePoints}
            </Typography>
            <button className="btn-apply-coupon" onClick={onClickApplyMiles}>
              Redeem Points
            </button>
            <Typography variant="body2" color="error">
              {userMilesError}
            </Typography>
            <Typography variant="body2" color="primary">
              {discountedMilePrice}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Total: ${totalAmount.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={onClickBookNow}
            >
              Book Now
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PaymentDetails;
