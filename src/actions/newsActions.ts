import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { NewsType } from "../types/newsType";

import { newsApi } from "../utils/api/newsApi";
import { NotificationToast } from "../utils/handlers/NotificationToast";

export const newsActions = {
  gets: createAsyncThunk("news/gets", async () => {
    try {
      const res = await newsApi.gets();
      return res.data;
    } catch (err) {
      throw err;
    }
  }),

  get: createAsyncThunk("news/get", async (_id: string, thunkAPI) => {
    try {
      // const res = await newsApi.gets(_id)
    } catch (error) {}
  }),

  create: createAsyncThunk("news/create", async (news: NewsType, thunkAPI) => {
    try {
      const res: AxiosResponse<NewsType> = await newsApi.create(news);
      NotificationToast({
        message: "Created news successfully",
        type: "success",
      });
      return res.data;
    } catch (error: any) {
      NotificationToast({
        message: "Created news failure",
        type: "error",
      });
      if (error.data) {
        return thunkAPI.rejectWithValue(error.data);
      }
      throw error;
    }
  }),

  update: createAsyncThunk("news/update", async (news: NewsType, thunkAPI) => {
    try {
      const res = await newsApi.update(news);
      NotificationToast({
        message: "News updated successfully",
        type: "success",
      });
      return res.data;
    } catch (error: any) {
      if (error.data) {
        NotificationToast({ message: "News updated failure", type: "error" });
        return thunkAPI.rejectWithValue(error.data);
      }
      throw error;
    }
  }),

  delete: createAsyncThunk("news/delete", async (_id: string) => {
    try {
      const res = await newsApi.delete(_id);
      NotificationToast({ message: res.data, type: "success" });
      return true;
    } catch (error: any) {
      NotificationToast({ message: "News deleted failure", type: "error" });
      throw error;
    }
  }),

  updateViewCount: createAsyncThunk(
    "news/update/viewCount",
    async (_id: string) => {
      try {
        await newsApi.updateViewCount(_id);
        return true;
      } catch (error) {
        throw error;
      }
    }
  ),
};
