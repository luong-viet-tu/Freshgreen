import { createAsyncThunk } from "@reduxjs/toolkit";
import { faqApi } from "../utils/api/faqApi";

export const faqActions = {
  gets: createAsyncThunk("/faq/gets", async () => {
    try {
      const res = await faqApi.gets();
      return res.data;
    } catch (error) {
      throw error;
    }
  }),
};
