import { SITE_URL } from "@/def";
import { useAppSelector } from "@/src/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toastr, { success } from 'toastr';

const initialState = {
  post_id: "",
  pageState: "idle",
  message: "",
  error: [],
  status: "",
};

export const postLike = createAsyncThunk(
  "auth/postLike",
  async (payload, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      localStorage.setItem("current_post_id", payload.id);
      const response = await axios.post(
        SITE_URL + "/updatelike",
        {
          type: payload.type,
          id: payload.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.statuscode == false) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
      toastr.success("Liked.",success.response.data.message);
      return response.data;
    } catch (error) {
      toastr.error("Please Sign In To Like.",error.response.data.message);
      return thunkAPI.rejectWithValue({
        error: error.response.data.message,
        status: error.response.status,
      });
    }
  }
);

export const postComment = createAsyncThunk(
  "auth/postComment",
  async (payload, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(SITE_URL + "/comment", {
        headers: { Authorization: `Bearer ${token}` },
        body: {
          comment: payload.comment,
        },
      });
      if (response.data.statuscode == false) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
      toastr.success("Commented.",success.response.data.message);
      return response.data;
    } catch (error) {
      toastr.error("Please Sign In To Comment.",error.response.data.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const postDeleteComment = createAsyncThunk(
  "auth/postDeleteComment",
  async (payload, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(SITE_URL + "/deletecomment", {
        headers: { Authorization: `Bearer ${token}` },
        body: {
          comment_id: payload.comment_id,
        },
      });
      if (response.data.statuscode == false) {
        return thunkAPI.rejectWithValue({ error: error.message });
      }
      toastr.success("Comment Deleted.",success.response.data.message);
      return response.data;
    } catch (error) {
      toastr.error("Please Sign In To Delete Comment.",error.response.data.message);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(postLike.pending, (state, action) => {
        state.pageState = "loading";
        state.post_id = parseInt(localStorage.getItem("current_post_id"), 10);
        state.message = "";
        state.error = "";
      })
      .addCase(postLike.fulfilled, (state, action) => {
        state.pageState = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(postLike.rejected, (state, action) => {
        state.pageState = "failed";
        state.status = action.payload.status;
        state.error = action.payload.error;
      });
  },
});

export const postActions = postSlice.actions;

export const postSelect = (id) =>
  useAppSelector((state) => (state.post.post_id === id ? state.post : {}));
