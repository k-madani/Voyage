import axios from "axios";

let flightDetailsArray = [];
let flightCarriers = {};
let legObj = [];

const flightDetailsObject = {
  flightItinerary: {
    itineraryId: "",
    sourceCity: "",
    destinationCity: "",
    departureDateTime: "",
    returnDateTime: "",
    totalTravelDuration: "",
  },
  legs: [],
  segments: [],
  isSelfTransfer: false,
  isProtectedSelfTransfer: true,
  farePolicy: {
    isChangeAllowed: false,
    isPartiallyChangeable: false,
    isCancellationAllowed: false,
    isPartiallyRefundable: false,
  },
  price: {},
  tags: [],
};

function setFlightDetails(itinerary) {
  const flightDetails = JSON.parse(JSON.stringify(flightDetailsObject));
  flightDetails.flightItinerary.itineraryId = itinerary.id;
  flightDetails.flightItinerary.sourceCity = itinerary.legs[0].origin.city;
  flightDetails.flightItinerary.destinationCity =
    itinerary.legs[0].destination.city;
  flightDetails.flightItinerary.departureDateTime = itinerary.legs[0].departure;
  flightDetails.flightItinerary.returnDateTime = itinerary.legs[0].arrival;
  flightDetails.flightItinerary.totalTravelDuration =
    itinerary.legs[0].durationInMinutes;

  if (itinerary.legs[0].segments.length > 1) {
    let legObject = legObj;
    legObject = {
      directFlight: false,
      segments: [],
      fromDestination: itinerary.legs[0].origin.name,
      toDestination: itinerary.legs[0].destination.name,
      fromDestinationCode: itinerary.legs[0].origin.displayCode,
      toDestinationCode: itinerary.legs[0].destination.displayCode,
      flightDuration: itinerary.legs[0].durationInMinutes,
      howIsItOperated: itinerary.legs[0].carriers.operationType,
    };
    itinerary.legs[0].segments.forEach((individualSegment) => {
      const carriers = {
        flightNumber: individualSegment.flightNumber,
        flightId: individualSegment.marketingCarrier.id,
        carrierName: individualSegment.marketingCarrier.name,
        carrierLogoUrl: fetchURL(individualSegment.marketingCarrier.id),
      };
      let segment = addSegmentToLeg(individualSegment, carriers);
      legObject.segments.push(segment);
    });
    flightDetails.legs.push(legObject);
  } else {
    const carrier = {
      flightNumber: itinerary.legs[0].segments[0].flightNumber,
      flightId: itinerary.legs[0].carriers.marketing[0].id,
      carrierName: itinerary.legs[0].carriers.marketing[0].name,
      carrierLogoUrl: itinerary.legs[0].carriers.marketing[0].logoUrl,
    };
    let leg = addDirectFlightLeg(itinerary.legs[0].segments[0], carrier);
    flightDetails.legs.push(leg);
  }
  return flightDetails;
}

function addSegmentToLeg(individualSegment, carrierInformation) {
  return {
    fromDestination: individualSegment.origin.name,
    toDestination: individualSegment.destination.name,
    fromDestinationCode: individualSegment.origin.displayCode,
    toDestinationCode: individualSegment.destination.displayCode,
    flightDuration: individualSegment.durationInMinutes,
    arrival: individualSegment.arrival,
    departure: individualSegment.departure,
    carriers: carrierInformation,
  };
}

function addDirectFlightLeg(singleItinerary, carrierInformation) {
  return {
    directFlight: true,
    fromDestination: singleItinerary.origin.name,
    toDestination: singleItinerary.destination.name,
    fromDestinationCode: singleItinerary.origin.displayCode,
    toDestinationCode: singleItinerary.destination.displayCode,
    flightDuration: singleItinerary.durationInMinutes,
    arrival: singleItinerary.arrival,
    departure: singleItinerary.departure,
    //howIsItOperated: singleItinerary.carriers.operationType,
    carriers: carrierInformation,
  };
}

function fetchURL(flightID) {
  const airline = flightCarriers.find((carrier) => carrier.id === flightID);
  return airline ? airline.logoUrl : "notFound";
}

const searchFlightsParams = {
  method: "GET",
  url: "https://sky-scrapper1.p.rapidapi.com/api/v1/flights/searchFlights",
  params: {
    fromId:
      "eyJzaWQiOiJMR1ciLCJlaWQiOiI5NTU2NTA1MSIsInBlaWQiOiIyNzU0NDAwOCIsImZwdCI6IkFJUlBPUlQifQ",
    toId: "eyJzaWQiOiJCT1MiLCJlaWQiOiI5NTY3MzY3OSIsInBlaWQiOiIyNzUzOTUyNSIsImZwdCI6IkFJUlBPUlQifQ",
    date: "2023-12-20",
    returnDate: "2024-03-20",
    currency: "USD",
    market: "US",
    locale: "en-US",
  },
  headers: {
    "X-RapidAPI-Key": "f0bfcd1002mshd85e8125bd9a805p1272dajsn01400cb00a33",
    "X-RapidAPI-Host": "sky-scrapper1.p.rapidapi.com",
  },
};

const searchFlights = async (APIParams = {}) => {
  try {
    searchFlightsParams.params.fromId = APIParams.fromId;
    searchFlightsParams.params.toId = APIParams.toId;
    searchFlightsParams.params.date = APIParams.date;
    searchFlightsParams.params.returnDate = "2024-03-20";
    const response = await axios.request(searchFlightsParams);
    if (response) {
      flightCarriers = response.data.data.filterStats.carriers;
    }
    for (const itinerary of response.data.data.itineraries) {
      let availableFlights = setFlightDetails(itinerary);
      availableFlights.price = itinerary.price;
      availableFlights.farePolicy = itinerary.farePolicy;
      availableFlights.isProtectedSelfTransfer =
        itinerary.isProtectedSelfTransfer;
      availableFlights.isSelfTransfer = itinerary.isSelfTransfer;
      availableFlights.tags = itinerary.tags;
      flightDetailsArray.push(availableFlights);
    }
    return flightDetailsArray;
  } catch (error) {
    console.log(error);
  }
};

const searchAirportParams = {
  method: "GET",
  url: "https://sky-scrapper1.p.rapidapi.com/api/v1/flights/searchAirport",
  params: {
    query: "new york",
    currency: "USD",
    market: "US",
    locale: "en-US",
  },
  headers: {
    "X-RapidAPI-Key": "f0bfcd1002mshd85e8125bd9a805p1272dajsn01400cb00a33",
    "X-RapidAPI-Host": "sky-scrapper1.p.rapidapi.com",
  },
};

const searchAirports = async (originLocation) => {
  try {
    searchAirportParams.params.query = originLocation;
    const response = await axios.request(searchAirportParams);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export { searchFlights, searchAirports };
