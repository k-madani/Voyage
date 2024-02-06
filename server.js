import express from "express";
import initialize from "./backend/app.js";

const PORT = 4000;
const app = express();
initialize(app);
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
