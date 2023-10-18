import { SITE_URL } from "@/def";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoggedIn: false,
  token: "",
  user: {},
  pageState: "idle",
  message: "",
  error: [],
  statusCode: false,
};

export const getAuthCheck = createAsyncThunk(
  "auth/getAuthCheck",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(SITE_URL + "/check-auth", {
        headers: { Authorization: `Bearer ${payload.token}` },
      });
      if (response.data.statuscode == false) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const postSignIn = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(SITE_URL + "/login", payload);
      if (response.data.statuscode == false) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const postLogout = createAsyncThunk(
  "auth/logout",
  async ({ token }, thunkAPI) => {
    try {
      var config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(SITE_URL + "/logout", {}, config);
      if (response.data.statuscode === false) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokenAndUser(state, { payload: { token, user } }) {
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(postSignIn.pending, (state, action) => {
        state.pageState = "loading";
        state.message = "";
        state.error = "";
      })
      .addCase(postSignIn.fulfilled, (state, action) => {
        state.pageState = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("userdata", JSON.stringify(action.payload.user));
      })
      .addCase(postSignIn.rejected, (state, action) => {
        state.pageState = "failed";
        state.error = action.payload.error;
      })
      .addCase(getAuthCheck.pending, (state, _) => {
        state.pageState = "loading";
        state.message = "";
        state.error = "";
      })
      .addCase(getAuthCheck.fulfilled, (state, _) => {
        state.pageState = "succeeded";
        state.isLoggedIn = true;
      })
      .addCase(getAuthCheck.rejected, (state, _) => {
        state.pageState = "failed";
        state.token = "";
        state.user = "";
        state.message = "";
        state.isLoggedIn = false;
      })
      .addCase(postLogout.pending, (state, _) => {
        state.pageState = "loading";
        state.message = "";
        state.error = "";
      })
      .addCase(postLogout.fulfilled, (state, _) => {
        localStorage.clear();
      })
      .addCase(postLogout.rejected, (state, _) => {
        state.pageState = "failed";
        state.token = "";
        state.user = "";
        state.message = "";
        state.isLoggedIn = false;
      });
  },
});

export const authActions = authSlice.actions;

export const authSelect = (state) => state.auth;
export const authUserSelect = (state) => state.auth.user;
export const authTokenSelect = (state) => state.auth.token;
export const logoutStateSelector = (state) => state.auth.logout;
export const authPageStateSelector = (state) => state.auth.pageState;
