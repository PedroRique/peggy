import axios from "axios";

export const fetchCoordinatesFromAddress = async (address: string | number | boolean) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=AIzaSyBadXr4D0wLV8t40rEmzAj5PLKsB-Oqago`
    );

    if (response.data.results.length > 0) {
      const latitude = response.data.results[0].geometry.location.lat;
      const longitude = response.data.results[0].geometry.location.lng;

      return { latitude, longitude };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};
