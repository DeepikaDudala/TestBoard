import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import resultsService from "./resultsService";
const initialState = {
  result: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getResult = createAsyncThunk(
  "result/getResult",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await resultsService.getResult(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    reset: (state) => {
      state.result = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getResult.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getResult.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.result = action.payload;
      })
      .addCase(getResult.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default resultSlice.reducer;
export const { reset } = resultSlice.actions;
