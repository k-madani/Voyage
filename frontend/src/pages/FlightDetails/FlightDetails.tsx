import { Button, Card, CardContent, Typography, Divider } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import video from "../../assets/clouds.mp4";
import { useLocation } from "react-router-dom";
import "./FlightDetails.css";
import ItinerarySchedule from "./ItinerarySchedule";
import PaymentDetails from "./PaymentDetails";
import { useState } from "react";
import Footer from "../../components/Footer/Footer";

const FlightSearchParams: React.FC<{}> = () => {
  const location = useLocation();
  const state = location.state;
  const [personalInfo, setPersonalInfo] = useState({});
  return (
    <div className="video-container">
      <video
        src={video}
        autoPlay
        muted
        loop
        className="video-background"
      ></video>
      <div className="overlay-container">
        <div className="static-content">
          <div>Secure Your Flight Booking</div>
        </div>
      </div>
      <div className="section-container">
        {/* Left Section */}
        <div className="left-section">
          <ItinerarySchedule setPersonalInfo={setPersonalInfo} state={state} />
        </div>
        <Divider orientation="vertical" flexItem />
        {/* Right Section */}
        <div className="right-section">
          <PaymentDetails personalInfo={personalInfo} state={state} />
        </div>
      </div>
    </div>
  );
};

const FlightDetails: React.FC = () => {
  return (
    <div>
      <Header />
      <FlightSearchParams />
      <Footer val={""} />
    </div>
  );
};

export default FlightDetails;
