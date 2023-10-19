import { homePageResponseSchema } from "@/src/schemas/schema";
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { normalize } from "normalizr";

import { fetchHomePageData } from "../../api/homepage.js";

const postsAdapter = createEntityAdapter();

export const getHomePageData = createAsyncThunk(
  "auth/getHomePageData",
  async (payload, thunkAPI) => {
    try {
      // Perform an async API call to fetch the data
      const response = await fetchHomePageData(); // Replace with your actual API call

      // Normalize the data using your schema
      const normalizedData = normalize(response.data, homePageResponseSchema); // Replace with your schema

      if (response.data.statuscode == false) {
        return thunkAPI.rejectWithValue({ error: response.data.errors });
      }
      return normalizedData;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const homePageSlice = createSlice({
  name: "homePage",
  initialState: postsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getHomePageData.pending, (state, action) => {
        state.pageState = "loading";
        state.message = "";
        state.error = "";
      })
      .addCase(getHomePageData.fulfilled, (state, action) => {
        state.pageState = "succeeded";
        state.entities = action.payload.entities;
        state.result = action.payload.result;
        state.ids = action.payload.result.post;
      })
      .addCase(getHomePageData.rejected, (state, action) => {
        state.pageState = "failed";
        state.error = action.payload.error || action.payload.errors;
      });
  },
});

export const homePageActions = homePageSlice.actions;

export const homePageSelectors = postsAdapter.getSelectors(
  (state) => state[homePageSlice.name]
);
