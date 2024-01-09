import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import testService from "./testService";

const initialState = {
  tests: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getTests = createAsyncThunk(
  "test/getTests",
  async (_, thunkAPI) => {
    try {
      return await testService.getTests();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    reset: (state) => initialState,
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

export default testSlice.reducer;
export const { reset } = testSlice.actions;
