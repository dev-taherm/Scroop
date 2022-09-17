import data from "../pages/api/loactionData.json";

const getStreetByname = (itemName) => {
  return data.streets.find((item) => item.name === itemName);
};

export default getStreetByname;
