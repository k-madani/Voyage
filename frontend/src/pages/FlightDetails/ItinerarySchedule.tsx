import React from "react";
import BookingPersonalInfo from "./BookingPersonalInfo";
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
} from "@mui/lab";
import { Card, CardContent, Typography, Grid, Divider } from "@mui/material";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import {
  calculateTotalDuration,
  ExtractDateAndTime,
} from "../Flights/FlightSearch";
import AirplanemodeActiveOutlinedIcon from "@mui/icons-material/AirplanemodeActiveOutlined";

interface ItineraryScheduleProps {
  flightItinerary: {
    itineraryId: string;
    sourceCity: string;
    destinationCity: string;
    departureDateTime: string;
    returnDateTime: string;
    totalTravelDuration: number;
  };
  legs: Leg[];
  segments: any[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: {
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isCancellationAllowed: boolean;
    isPartiallyRefundable: boolean;
  };
  price: {
    raw: number;
    formatted: string;
  };
}

interface Leg {
  directFlight: boolean;
  segments: Segment[];
  fromDestination: string;
  toDestination: string;
  fromDestinationCode: string;
  toDestinationCode: string;
  flightDuration: number;
  arrival: string;
  departure: string;
  howIsItOperated: string;
  totalTravelDuration: number;
  carriers: {
    flightNumber: string;
    flightId: number;
    carrierName: string;
    carrierLogoUrl: string;
  };
}

interface Segment {
  fromDestination: string;
  toDestination: string;
  fromDestinationCode: string;
  toDestinationCode: string;
  flightDuration: number;
  arrival: string;
  departure: string;
  carriers: {
    flightNumber: string;
    flightId: number;
    carrierName: string;
    carrierLogoUrl: string;
  };
}

interface Props {
  setPersonalInfo: any;
  state: ItineraryScheduleProps;
}

const ItinerarySchedule: React.FC<Props> = ({ setPersonalInfo, state }) => {
  return (
    <>
      <Card sx={{ height: "100%" }} className="itinerary-sched">
        <CardContent>
          {state?.legs.map((leg, index) => (
            <div key={index}>
              {/* Top Section of the Card Container - Flight Summary*/}
              <Grid container spacing={4}>
                <Grid item className="grid-operator-details">
                  <img
                    className="image-sched"
                    alt="Airline Logo"
                    src={
                      leg.carriers?.carrierLogoUrl
                        ? leg.carriers?.carrierLogoUrl
                        : leg.segments[0]?.carriers.carrierLogoUrl
                    }
                  />
                  <Typography className="typo-operatedby-sched">
                    {leg.carriers?.carrierName
                      ? leg.carriers?.carrierName
                      : leg.segments[0]?.carriers.carrierName}
                  </Typography>
                </Grid>
                <Grid item xs className="grid-departure-timings">
                  <Typography className="typo-timings">
                    {
                      ExtractDateAndTime(
                        leg.departure
                          ? leg.departure
                          : leg.segments[0].departure
                      ).time
                    }
                  </Typography>
                  <Typography className="typo-city">
                    {leg.fromDestinationCode}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs
                  container
                  direction="column"
                  spacing={2}
                  className="grid-transit"
                >
                  <Typography className="travel-duration">
                    {calculateTotalDuration(leg.flightDuration)}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "8em",
                    }}
                  >
                    <div className="flight-connection-container">
                      <AirplanemodeActiveOutlinedIcon className="icon-airplane-sched" />
                    </div>
                  </div>

                  <Typography className="transit-type">
                    {leg.directFlight
                      ? "Direct"
                      : leg.segments?.length - 1 > 1
                      ? `${leg.segments?.length - 1} Stops`
                      : `${leg.segments?.length - 1} Stop`}
                  </Typography>
                </Grid>
                <Grid item xs className="grid-arrival-timings">
                  <Typography className="typo-timings">
                    {
                      ExtractDateAndTime(
                        leg.arrival
                          ? leg.arrival
                          : leg.segments[leg.segments.length - 1].arrival
                      ).time
                    }
                  </Typography>
                  <Typography className="typo-city">
                    {leg.toDestinationCode}
                  </Typography>
                </Grid>
              </Grid>
              {/* Separating the summary and detailed itinerary */}
              <Divider
                className="divider-sched"
                orientation="horizontal"
                flexItem
              />
              {/* Itinerary of the entire flight connection */}
              {leg.segments?.length > 0 ? (
                // If flights have layovers/segments
                <>
                  {leg.segments?.map((segment, index) => (
                    <Timeline key={index}>
                      <Typography className="typography-logo">
                        <img
                          className="image-sched"
                          alt="Airline Logo"
                          src={segment.carriers.carrierLogoUrl}
                        />
                        {segment.carriers.carrierName}{" "}
                        {segment.carriers.flightNumber}
                      </Typography>
                      <TimelineItem className="timeline-container">
                        <TimelineOppositeContent
                          color="textSecondary"
                          className="timeline-opposite-content"
                        >
                          {calculateTotalDuration(segment.flightDuration)}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography>
                            {ExtractDateAndTime(segment.departure).time}{" "}
                            {segment.fromDestination}
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                      <TimelineItem className="timeline-container">
                        <TimelineSeparator>
                          <TimelineDot />
                        </TimelineSeparator>
                        <TimelineContent>
                          {ExtractDateAndTime(segment.arrival).time}{" "}
                          {segment.toDestination}
                        </TimelineContent>
                      </TimelineItem>
                    </Timeline>
                  ))}
                </>
              ) : (
                // Direct Flight
                <Typography>
                  <Timeline>
                    <Typography className="typography-logo">
                      <img
                        className="image-sched"
                        alt="Airline Logo"
                        src={leg.carriers.carrierLogoUrl}
                      />
                      {leg.carriers.carrierName} {leg.carriers.flightNumber}
                    </Typography>
                    <TimelineItem className="timeline-container">
                      <TimelineOppositeContent
                        color="textSecondary"
                        className="timeline-opposite-content"
                      >
                        {calculateTotalDuration(leg.flightDuration)}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography>
                          {ExtractDateAndTime(leg.departure).time}{" "}
                          {leg.fromDestination}
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem className="timeline-container">
                      <TimelineSeparator>
                        <TimelineDot />
                      </TimelineSeparator>
                      <TimelineContent>
                        {ExtractDateAndTime(leg.arrival).time}{" "}
                        {leg.toDestination}
                      </TimelineContent>
                    </TimelineItem>
                  </Timeline>
                </Typography>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
      <BookingPersonalInfo props={setPersonalInfo} />
    </>
  );
};

export default ItinerarySchedule;
