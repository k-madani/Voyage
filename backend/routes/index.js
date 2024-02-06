import userRouter from "./user-route.js";
import loginRouter from "./login-route.js";
import milesRouter from "./miles-route.js";
import offersRouter from "./offers-route.js";
import flightsRouter from "./flights-route.js";
import searchAirports from "./search-airport-route.js";
import cityCoordinates from "./coordinates-route.js";
import bookingRouter from "./booking-route.js";
import verifyToken from "../auth/auth.js";
import registerRoute from "./register-route.js";
import subscribers from "./subscribers-route.js";
import checkout from "./checkout.js";
import forgotPasswordRouter from "./forgot-password.js";

export default (app) => {
  app.use("/register", registerRoute);
  app.use("/login", loginRouter);
  app.use("/forgotPassword",forgotPasswordRouter);
  app.use("/user",verifyToken, userRouter);
  app.use("/miles",verifyToken, milesRouter);
  app.use("/offers",verifyToken, offersRouter);
  app.use("/flights",verifyToken, flightsRouter);
  app.use("/searchAirport",verifyToken, searchAirports);
  app.use("/booking",verifyToken, bookingRouter);
  app.use("/coordinates",verifyToken, cityCoordinates);
  app.use("/subscribe",subscribers);
  app.use("/checkout", checkout);
};
