import React, { useState } from "react";
import {
  Typography,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface FilterValues {
  price: [number, number];
  duration: [number, number];
}

interface FlightsAccordionProps {
  filters: FilterValues;
  setFilters: React.Dispatch<React.SetStateAction<FilterValues>>;
}

const FlightsAccordion: React.FC<FlightsAccordionProps> = ({
  filters,
  setFilters,
}) => {
  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: newValue as [number, number],
    }));
  };

  const handleDurationChange = (event: Event, newValue: number | number[]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      duration: newValue as [number, number],
    }));
  };
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Stops</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <label className="checkbox">
            <input type="checkbox" /> Direct
          </label>
          <label className="checkbox">
            <input type="checkbox" /> 1 Stop
          </label>
          <label className="checkbox">
            <input type="checkbox" /> 2+ Stops
          </label>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            value={filters.price}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={(value) => `$${value}`}
            max={10000}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Duration</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            value={filters.duration}
            onChange={handleDurationChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={(value) => `${value}min`}
            max={1000}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FlightsAccordion;
