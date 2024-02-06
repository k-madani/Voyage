import React, { ChangeEvent, useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  Box,
  TextField,
  Button,
  Typography,
  Autocomplete,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./SearchFlights.css";
import { searchType, searchBtn } from "../Utils/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useTranslation } from "react-i18next";

import CircularProgress from "@mui/material/CircularProgress";

interface Airport {
  label: string;
  value: string;
}

interface userDetails {
  id: string;
  token: string;
  type: string;
}

interface userDetails {
  id: string;
  token: string;
  type: string;
}

interface ApiResponse {
  price: {
    raw: number;
    formatted: string;
  };
  flightItinerary: {
    totalTravelDuration: number;
  };
}

const Loading: React.FC = () => (
  <div
    style={{
      background: "rgba(0, 0, 0, 0.5)",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <CircularProgress />
  </div>
);

const SearchFlights: React.FC = () => {
  const { t } = useTranslation("common");
  const user1 = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const [sourceSearch, setSourceSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");
  const [sourceAirports, setSourceAirports] = useState<Airport[]>([]);
  const [destinationAirports, setDestinationAirports] = useState<Airport[]>([]);
  const [responseData, setResponseData] = React.useState<ApiResponse[]>([]);
  const [loading, setLoading] = useState(false);
  let searchParams = {};

  const handleSearch = () => {
    setLoading(true);
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    searchParams = {
      fromId:
        source,
      toId: destination,
      date: selectedDate,
      returnDate: formattedDate,
    };
    handleFlightsRequest(searchParams);
  };

  async function handleFlightsRequest(searchParams: any) {
    var userToken = "";
    if (user1 != null) {
      userToken = (user1 as userDetails).token;
    }
    axios
      .post("http://localhost:4000/flights", searchParams, {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setResponseData(response.data);
        console.log(responseData);
        navigate("/searchFlights", { state: response.data });
      })
      .catch((error) => {
        console.error("Error fetching flights:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleSourceChange = (
    event: ChangeEvent<{}>,
    newValue: Airport | null
  ) => {
    setSource(newValue?.value || "");
  };

  const handleDestinationChange = (
    event: ChangeEvent<{}>,
    newValue: Airport | null
  ) => {
    setDestination(newValue?.value || "");
    // setDestination('');
  };

  useEffect(() => {
    if (sourceSearch != "") {
      var userId = "";
      var userToken = "";
      if (user1 != null) {
        userId = (user1 as userDetails).id;
        userToken = (user1 as userDetails).token;
      }
      axios
        .get(`http://localhost:4000/searchAirport?query=${sourceSearch}`, {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        })
        .then((response) => {
          const res = response.data;
          const airportData: Airport[] = res.map((item: any) => ({
            label: item.presentation.title,
            value: item.id,
          }));
          setSourceAirports(airportData);
        })
        .catch((error) => {
          console.error("Error fetching airports:", error);
        });
    }
  }, [sourceSearch]);

  useEffect(() => {
    if (destinationSearch != "") {
      var userId = "";
      var userToken = "";
      if (user1 != null) {
        userId = (user1 as userDetails).id;
        userToken = (user1 as userDetails).token;
      }
      axios
        .get(`http://localhost:4000/searchAirport?query=${destinationSearch}`, {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        })
        .then((response) => {
          const res = response.data;
          const airportData: Airport[] = res.map((item: any) => ({
            label: item.presentation.title,
            value: item.id,
          }));
          setDestinationAirports(airportData);
        })
        .catch((error) => {
          console.error("Error fetching airports:", error);
        });
    }
  }, [destinationSearch]);

  return (
    <>
      {loading && <Loading />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          paddingTop: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <div className="searchHeader">
            <Typography className="searchType" sx={searchType}>
              {t("user.source")}
            </Typography>
            <Autocomplete
              options={sourceAirports}
              getOptionLabel={(option) => option.label}
              onInputChange={(event, newInputValue) => {
                setSourceSearch(newInputValue);
              }}
              onChange={handleSourceChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("user.source.label")}
                  variant="outlined"
                  sx={{ width: "250px" }}
                />
              )}
            />
          </div>
          <div>
            <Typography className="searchType" sx={searchType}>
              {t("user.destination")}
            </Typography>
            <Autocomplete
              options={destinationAirports}
              getOptionLabel={(option) => option.label}
              onInputChange={(event, newInputValue) => {
                setDestinationSearch(newInputValue);
              }}
              onChange={handleDestinationChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("user.dest.label")}
                  variant="outlined"
                  sx={{ width: "250px" }}
                />
              )}
            />
          </div>
          <div>
            <Typography className="searchType" sx={searchType}>
              {t("user.travel.date")}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={t("user.travel.date")}
                sx={{ width: "250px" }}
                value={selectedDate}
                onChange={(newValue) =>
                  setSelectedDate(dayjs(newValue).format("YYYY-MM-DD"))
                }
              />
            </LocalizationProvider>
          </div>
          <Button variant="contained" onClick={handleSearch} sx={searchBtn}>
            {t("user.search.btn")}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SearchFlights;
