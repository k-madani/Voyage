import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { Map } from "leaflet";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// import html2canvas from "html2canvas";

import "leaflet/dist/leaflet.css";
import "./TravelHistory.css"; // Import a CSS file for styling

interface Location {
  latitude: number;
  longitude: number;
  name: string;
}

interface TravelHistoryProps {
  locations: Location[];
}

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const TravelHistory: React.FC<TravelHistoryProps> = ({ locations }) => {
  const mapRef = useRef<Map | null>(null);

  const downloadMapImage = async () => {
    // const map = mapRef.current;

    // if (map) {
    //   await new Promise<void>((resolve) => {
    //     setTimeout(() => {
    //       resolve();
    //     }, 500); // Adjust the delay as needed
    //   });

    //   html2canvas(map.getContainer()).then((canvas) => {
    //     const link = document.createElement("a");
    //     link.href = canvas.toDataURL("image/png");
    //     link.download = "travel_history_map.png";
    //     link.click();
    //   });
    // }
    window.print();
  };

  // Clear the map's event listeners when the component is unmounted
  useEffect(() => {
    return () => {
      const map = mapRef.current;
      if (map) {
        map.remove();
      }
    };
  }, []);

  return (
    <div>
      <Header />
      <MapContainer
        center={[0, 0]}
        zoom={2.7}
        style={{
          margin: "3em",
          marginLeft: "10em",
          height: "700px",
          width: "100%",
        }}
        ref={mapRef}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((location, index) => (
          <div key={index} className="location-container">
            {/* Display location name just below customIcon */}
            <Marker
              position={[location.latitude, location.longitude]}
              icon={customIcon}
            />
            <div className="location-name">{location.name}</div>
          </div>
        ))}
        {/* Display Popup constantly without having to click on the marker */}
      </MapContainer>
      <button onClick={downloadMapImage}>Download Map Image</button>
      <Footer val={""} />
    </div>
  );
};

export default TravelHistory;
