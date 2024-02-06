import { Button, Paper, Typography } from "@mui/material";

const FlightSearchCriteria = () => {
  return (
    <Paper>
      <Typography variant="h4">Flight Search</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography variant="subtitle1">From</Typography>
          <input type="text" placeholder="London (Any)" />
        </div>
        <div>
          <Typography variant="subtitle1">To</Typography>
          <input type="text" placeholder="Boston (BOS)" />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography variant="subtitle1">Adults</Typography>
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5+</option>
          </select>
        </div>
        <div>
          <Typography variant="subtitle1">Travel Class</Typography>
          <select>
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First">First</option>
          </select>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <div>
          <Typography variant="subtitle1">Departure Date</Typography>
          <input type="date" placeholder="Wed, 20 Dec" />
        </div>
        <div>
          <Typography variant="subtitle1">Return Date</Typography>
          <input type="date" placeholder="Wed, 20 Dec" />
        </div>
      </div>
      <Button variant="contained" color="primary" style={{ marginTop: "10px" }}>
        Search
      </Button>
    </Paper>
  );
};

export default FlightSearchCriteria;
