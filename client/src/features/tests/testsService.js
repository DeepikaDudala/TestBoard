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

//get Test
const getTest = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(API_URL + id, config);
  if (response.data) {
    localStorage.setItem("test", JSON.stringify(response.data.test));
  }
  return response.data.test;
};

//create Result
const createResult = async (id, answers, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL + id + "/createResult",
    { answers },
    config
  );
  return response.data;
};
const testsService = {
  getTests,
  getTest,
  createResult,
};

export default testsService;
