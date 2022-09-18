import data from "../pages/api/loactionData.json";

const getStreetByName = (itemName) => {
  return data.streets.map((item) => item.name === itemName);
};

export default getStreetByName;
