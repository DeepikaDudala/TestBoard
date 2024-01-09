import axios from "../axios";
const API_URL = "/tests/";

//Get All Tests
const getTests = async () => {
  const response = await axios.get(API_URL);
  if (response.data) {
    localStorage.setItem("tests", JSON.stringify(response.data.tests));
  }
  return response.data.tests;
};

const testService = {
  getTests,
};

export default testService;
