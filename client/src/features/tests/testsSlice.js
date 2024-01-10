import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import testsService from "./testsService";
const tests = JSON.parse(localStorage.getItem("tests"));

const initialState = {
  tests: tests ? tests : [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getTests = createAsyncThunk(
  "tests/getTests",
  async (_, thunkAPI) => {
    try {
      return await testsService.getTests();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    reset: (state) => {
      localStorage.removeItem("tests");
      state.tests = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.tests = action.payload;
      })
      .addCase(getTests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default testsSlice.reducer;
export const { reset } = testsSlice.actions;
