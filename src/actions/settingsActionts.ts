import { createAsyncThunk } from "@reduxjs/toolkit";
import { settingsApi } from "../utils/api/settingsApi";

export const settingsActions = {
  getBanner: createAsyncThunk("/settings/getBanner", async () => {
    try {
      const res = await settingsApi.getBanner();
      return res.data;
    } catch (error) {
      throw error;
    }
  }),
};
