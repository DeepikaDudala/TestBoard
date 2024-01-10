import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import testsService from "./testsService";
const test = JSON.parse(localStorage.getItem("test"));

const initialState = {
  test: test ? test : [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};
export const getTest = createAsyncThunk(
  "test/getTest",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await testsService.getTest(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
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
    reset: (state) => {
      localStorage.removeItem("test");
      state.test = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.test = action.payload;
      })
      .addCase(getTest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default testSlice.reducer;
export const { reset } = testSlice.actions;
