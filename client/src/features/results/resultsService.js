import axios from "../axios";
const API_URL = "results/";

//Get All Results
const getAllResults = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data.results;
};

//get Result
const getResult = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(API_URL + id, config);
  return response.data.result;
};

const resultsService = {
  getAllResults,
  getResult,
};

export default resultsService;
