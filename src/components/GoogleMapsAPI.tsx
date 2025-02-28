import axios from "axios";

export const fetchCoordinatesFromAddress = async (address: string | number | boolean) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=AIzaSyCTibYe1I54EqpM1pYBEXyPm2OXuSU5gjQ`
    );

    if (response.data.results.length > 0) {
      const latitude = response.data.results[0].geometry.location.lat as number;
      const longitude = response.data.results[0].geometry.location.lng as number;

      return { latitude, longitude };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};
