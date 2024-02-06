import "./App.css";

import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ForgorPassword from "./pages/ForgotPassword/ForgotPassword";
import About from "./pages/About/About";
import Confirmation from "./pages/Confirmation/Confirmation";
import Failure from "./pages/Failure/Failure";
import FlightDetails from "./pages/FlightDetails/FlightDetails";
import {FlightSearch} from "./pages/Flights/FlightSearch";
import Landing from './pages/LandingPage/Landing';
import Login from './pages/Login/Login';
import Payment from "./pages/Payment/Payment";
import Privacy from './pages/Privacy/Privacy';
import Profile from './pages/Profile/Profile';
import React from 'react';
import Refund from "./pages/Refund/Refund";
import Registration from './pages/Registration/Registration';
import Subscribe from "./pages/subscribe/Subscribe";
import Miles from "./pages/Miles/Miles";
import Terms from "./pages/Terms/Terms";
import TravelHistory from "./pages/TravelHistory/TravelHistory";
import UserLanding from './pages/UserLandingPage/UserLanding';
import logo from './logo.svg';

function App() {
  const cities = [
    {
      name: "London",
      latitude: 51.5074456,
      longitude: -0.1277653,
    },
    {
      name: "New York",
      latitude: 40.7127281,
      longitude: -74.0060152,
    },
    {
      name: "Boston",
      latitude: 42.3554334,
      longitude: -71.060511,
    },
  ];

  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Landing</Link>
            </li>
          </ul>
        </nav> */}

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<UserLanding />}></Route>
          <Route path="/searchFlights" element={<FlightSearch />}></Route>
          <Route path="/forgotPassword" element={<ForgorPassword/>}></Route>
          <Route path="/flightDetails" element={<FlightDetails />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/subscribe" element={<Subscribe />}></Route>
          <Route path="/miles" element={<Miles />}></Route>
          <Route path="/Confirmation" element={<Confirmation />}></Route>
          <Route path="/privacypolicy" element={<Privacy />}></Route>
          <Route path="/refundpolicy" element={<Refund />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/termsofservices" element={<Terms />}></Route>
          <Route path="/failure" element={<Failure />}></Route>
          <Route
            path="/travelMap"
            element={<TravelHistory locations={cities} />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
