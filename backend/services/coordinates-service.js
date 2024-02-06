import axios from "axios";

const getCityCoordinates = async (cityNamesArray) => {
  const cityNames = JSON.parse(cityNamesArray);
  try {
    const promises = cityNames.map(async (cityName) => {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=9c320989d8e544678c8cebd73198bf0e`
      );
      const { lat, lng } = response.data.results[0].geometry;
      return {
        name: cityName,
        latitude: lat,
        longitude: lng,
      };
    });
    return Promise.all(promises);
  } catch (error) {
    console.log(error);
  }
};

export default getCityCoordinates;
