import "./FlightSearch.css";
import * as React from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import FlightsAccordion from "../../components/FlightsLanding/FlightsAccordion";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FlightSharpIcon from "@mui/icons-material/FlightSharp";
import { useLocation } from "react-router-dom";
import AirplanemodeActiveOutlinedIcon from "@mui/icons-material/AirplanemodeActiveOutlined";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 10;
interface ApiResponse {
  price: {
    raw: number;
    formatted: string;
  };
  flightItinerary: {
    totalTravelDuration: number;
  };
}

interface FlightParams {
  fromId: string;
  toId: string;
  date: string;
  returnDate: string;
}

interface FilterValues {
  price: [number, number];
  duration: [number, number];
}

const FlightSearchParams: React.FC<{ parameters: any }> = ({ parameters }) => {
  const navigate = useNavigate();
  const onClickSearchIcon = () => {
    navigate("/home");
  };
  return (
    <Container className="flight-search-details">
      <Grid container className="flight-search-params" direction="row">
        <Typography className="search-param-source">
          {parameters.sourceCity}
        </Typography>
        <FlightSharpIcon fontSize="small" className="search-param-flight" />
        <Typography className="search-param-destination">
          {parameters.destinationCity}
        </Typography>
        <Typography className="search-param-date">
          {ExtractDateAndTime(parameters.departureDateTime).date}
        </Typography>
      </Grid>
      <SearchSharpIcon onClick={onClickSearchIcon} className="search-button" />
    </Container>
  );
};

const ExtractDateAndTime = (
  dateTimeString: string
): { date: string; time: string } => {
  const dateTime = new Date(dateTimeString);

  // Extract date and time components
  const date = dateTime.toISOString().split("T")[0];
  const time = dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Return an object with date and time properties
  return { date, time };
};

const calculateTotalDuration = (totalDurationInMinutes: number): string => {
  const hours = Math.floor(totalDurationInMinutes / 60);
  const minutes = totalDurationInMinutes % 60;
  return `${hours}h ${minutes}m`;
};

const FlightCard: React.FC<{ itinerary: any }> = ({ itinerary }) => {
  const navigate = useNavigate();
  let {
    sourceCity,
    destinationCity,
    departureDateTime,
    returnDateTime,
    totalTravelDuration,
  } = itinerary.flightItinerary;
  let airlineLogo;
  let operatedBy;
  if (itinerary.legs[0].directFlight) {
    airlineLogo = itinerary.legs[0].carriers.carrierLogoUrl;
    operatedBy = itinerary.legs[0].carriers.carrierName;
  } else {
    airlineLogo = itinerary.legs[0].segments[0].carriers.carrierLogoUrl;
    operatedBy = itinerary.legs[0].segments[0].carriers.carrierName;
  }

  const departureTimings = ExtractDateAndTime(departureDateTime);
  const arrivalTimings = ExtractDateAndTime(returnDateTime);

  const onClickSearchItinerary = (BookingItinerary: any) => {
    navigate("/flightDetails", { state: BookingItinerary });
  };

  return (
    <div>
      <Grid item xs={12} className="grid-container">
        <Card>
          <CardContent className="card-content">
            <Grid container spacing={4}>
              <Grid item className="grid-operator-details">
                <img className="image" alt="Airline Logo" src={airlineLogo} />
                <Typography className="typo-operatedby">
                  Operated by {operatedBy}
                </Typography>
              </Grid>
              <Grid item xs className="grid-departure-timings">
                <Typography className="typo-timings">
                  {departureTimings.time}
                </Typography>
                <Typography className="typo-city">{sourceCity}</Typography>
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
                  {calculateTotalDuration(totalTravelDuration)}
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="flight-connection-container">
                    <AirplanemodeActiveOutlinedIcon className="icon-airplane" />
                  </div>
                </div>
                <Typography className="transit-type">
                  {itinerary.legs[0].directFlight
                    ? "Direct"
                    : itinerary.legs[0].segments?.length - 1 > 1
                    ? `${itinerary.legs[0].segments?.length - 1} Stops`
                    : `${itinerary.legs[0].segments?.length - 1} Stop`}
                </Typography>
              </Grid>
              <Grid item xs className="grid-arrival-timings">
                <Typography className="typo-timings">
                  {arrivalTimings.time}
                </Typography>
                <Typography className="typo-city">{destinationCity}</Typography>
              </Grid>
              <Grid
                item
                xs
                container
                direction="column"
                spacing={2}
                className="grid-price"
              >
                <Typography className="flight-price">
                  {itinerary.price.formatted}
                </Typography>
                <Button
                  className="btn-select-itinerary"
                  onClick={() => onClickSearchItinerary(itinerary)}
                >
                  Select
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

const FlightSearch: React.FC = () => {
  const location = useLocation();
  const responseData = location.state as ApiResponse[];

  const [currentPage, setCurrentPage] = React.useState(1);

  const [filters, setFilters] = React.useState<FilterValues>({
    price: [0, 10000],
    duration: [0, 1000],
  });

  const calculatePagination = (
    data: any[],
    currentPage: number,
    itemsPerPage: number
  ) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const paginatedData = data.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    return { totalPages, paginatedData };
  };

  const applyFilters = () => {
    // Filter the response data based on the selected filters
    const filteredData = responseData.filter((itinerary) => {
      const { price, flightItinerary } = itinerary;
      return (
        price.raw >= filters.price[0] &&
        price.raw <= filters.price[1] &&
        flightItinerary.totalTravelDuration >= filters.duration[0] &&
        flightItinerary.totalTravelDuration <= filters.duration[1]
      );
    });
    const { totalPages, paginatedData } = calculatePagination(
      filteredData,
      currentPage,
      ITEMS_PER_PAGE
    );

    return { totalPages, paginatedData };
  };

  const { totalPages, paginatedData } = applyFilters();

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  return (
    <React.Fragment>
      <Header></Header>
      <FlightSearchParams
        parameters={responseData[0]?.flightItinerary}
      ></FlightSearchParams>

      <Container className="accordion">
        <FlightsAccordion filters={filters} setFilters={setFilters} />
      </Container>

      <Container className="flightcard-container">
        <Grid>
          {paginatedData.map((itinerary, index) => (
            <FlightCard key={index} itinerary={itinerary} />
          ))}
        </Grid>
      </Container>

      {/* Pagination controls */}
      <div style={{ textAlign: "center", marginTop: "10px" }}>
      {Array.from({ length: Math.min(totalPages, 8) }).map((_, index) => (
        
          <Button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            variant={currentPage === index + 1 ? "contained" : "outlined"}
            style={{ margin: "0 5px" }}
          >
            {index + 1}
          </Button>
        ))}
      </div>

      <div style={{ clear: "both" }}></div>
      <Footer val={"landing"} />
    </React.Fragment>
  );
};

export { FlightSearch, calculateTotalDuration, ExtractDateAndTime };
